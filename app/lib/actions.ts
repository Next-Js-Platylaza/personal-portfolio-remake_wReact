"use server";
import { getCurrentUserId, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
	prevState: AccountFormState | undefined,
	formData: FormData,
) {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						fields: formData,
						errors: undefined,
						message: "Invalid credentials.",
					};
				default:
					return {
						fields: formData,
						errors: undefined,
						message: "Something went wrong.",
					};
			}
		}
		throw error;
	}
}

async function hashPassword(plainTextPassword: string): Promise<string> {
	const saltRounds = 5; // Adjust the cost factor (higher is more secure but slower)
	try {
		const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.error("API Error: Failed hashing password:", error);
		throw error; // Re-throw or handle the error appropriately
	}
}

//#region Account Creation
const AccountFormSchema = z.object({
	id: z.string(),
	name: z
		.string({ error: "Please enter a username." })
		.min(4, { error: "Username must contain more than 3 characters" })
		.max(15, { error: "Username must be shorter than 16 characters" }),
	email: z.email({ error: "Please input a valid email address." }),
	password: z
		.string({ error: "Please input a valid password." })
		.min(5, { error: "Password must contain more than 4 characters" })
		.max(25, { error: "Password must be less than 26 characters" }),
});

const CreateUser = AccountFormSchema.omit({ id: true });

export type AccountFormState = {
	fields: FormData;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
	message?: string | null;
};

export async function createUser(
	prevState: AccountFormState,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = CreateUser.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to create account.",
		};
	}

	// Prepare data for insertion into the database
	const uuid = uuidv4();

	const { name, email, password } = validatedFields.data;
	const hash = await hashPassword(password);

	try {
		await sql`
		INSERT INTO users (id, name, email, password)
		VALUES (${uuid}, ${name}, ${email.toLowerCase()}, ${hash})`;
	} catch (error) {
		let message = "Something went wrong, please try again. | " + error;
		if (`${error}`.includes("unique")) {
			if (`${error}`.includes("name"))
				message = "Username taken. Please choose another username.";
			else if (`${error}`.includes("email"))
				message = "Email taken. Please use another email.";
			else message = "Failed to generate id, please try again.";
		}

		return {
			fields: formData,
			message: message,
		};
	}

	// Login the user
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (!isRedirectError(error)) {
			// Revalidate the cache and redirect the user. If auto-login failed
			revalidatePath("/account/login");
			redirect("/account/login");
		}
	}

	const url: string = (formData.get("redirectTo") as string) ?? "/";
	// Revalidate the cache and redirect the user. If auto-login worked
	revalidatePath(url);
	redirect(url);
}
//#endregion Account Creation Form

//#region Contact Me
const ContactFormSchema = z.object({
	first_name: z
		.string({ error: "Please enter a first name." })
		.min(1, { error: "First name must contain at least 1 character" })
		.max(20, { error: "First name must be less than 21 characters" }),
	last_name: z
		.string({ error: "Please enter a last name." })
		.min(1, { error: "Last name must contain at least 1 character" })
		.max(20, { error: "Last name must be less than 21 characters" }),
	email: z.email({ error: "Please input a valid email address." }),
	message: z
		.string({ error: "Please input a valid message." })
		.min(5, { error: "Message must contain more than 4 characters" })
		.max(300, { error: "Message must be less than 301 characters" }),
	message_type: z.enum(["business", "feedback", "general"]),
});

const SendContactForm = ContactFormSchema.omit({});

export type ContactFormState = {
	fields: FormData;
	errors?: {
		first_name?: string[];
		last_name?: string[];
		email?: string[];
		message?: string[];
		message_type?: string[];
	};
	message?: string | null;
	wasSubmited: boolean;
};

export async function sendContactForm(
	prevState: ContactFormState,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = SendContactForm.safeParse({
		first_name: formData.get("first-name"),
		last_name: formData.get("last-name"),
		email: formData.get("email"),
		message: formData.get("message"),
		message_type: formData.get("message-type"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to send message.",
			wasSubmited: false,
		};
	}

	const { first_name, last_name, email, message, message_type } =
		validatedFields.data;

	try {
		await sql`
		INSERT INTO contact (first_name, last_name, email, message, message_type)
		VALUES (${first_name}, ${last_name}, ${email}, ${message}, ${message_type}::contact_message_type)`;
	} catch (error) {
		return {
			fields: formData,
			message: "Something went wrong, please try again. | " + error + " | SQL :"+`
		INSERT INTO contact (first_name, last_name, email, message, message_type)
		VALUES (${first_name}, ${last_name}, ${email}, ${message}, ${message_type}::contact_message_type)`,
			wasSubmited: false,
		};
	}

	return {
			fields: formData,
			message: "Successfully sent your message!",
			wasSubmited: true,
	};
}
//#endregion Contact Form

//#region Comments
const CommentFormSchema = z.object({
	article_id: z.string(),
	text: z
		.string({ error: "Please input text." })
		.min(1, { error: "Comment must contain 1 or more characters" })
		.max(100, { error: "Comment must be less than 101 characters" })
});

export type CommentFormState = {
	fields: FormData;
	errors?: {
		article_id?: string[],
		text?: string[],
	};
	message?: string | null;
};

	//#region Comment Creation
const CreateComment = CommentFormSchema.omit({});

export async function createComment(
	prevState: CommentFormState,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = CreateComment.safeParse({
		article_id: formData.get("article-id"),
		text: formData.get("text"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "DisplayError",
		};
	}

	// Prepare data for insertion into the database
	const { article_id, text } = validatedFields.data;
	const user_id = await getCurrentUserId() as string;

	try {
		await sql`
		INSERT INTO comments (article_id, user_id, text)
		VALUES (${article_id}, ${user_id}, ${text})`;
	} catch (error) {
		return {
			fields: formData,
			message: "Something went wrong, please try again. | " + error,
		};
	}

	const url: string = (formData.get("redirectTo") as string) ?? `/articles/${article_id}`;
	// Revalidate the cache and redirect the user.
	revalidatePath(url);

	formData.set("text", "");
	return {
		fields: formData,
		message: "Succesfully commented on article.",
	};
}
//#endregion Comment Creation

	//#region Comment Editing
const EditComment = CommentFormSchema.omit({});

export async function editComment(
	prevState: CommentFormState,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = EditComment.safeParse({
		article_id: formData.get("article-id"),
		text: formData.get("text"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to edit comment.",
		};
	}

	// Prepare data for insertion into the database
	const { article_id, text } = validatedFields.data;
	const user_id = await getCurrentUserId() as string;

	try {
		await sql`
		UPDATE comments SET text = ${text}
		WHERE article_id = ${article_id} AND user_id = ${user_id}`;
	} catch (error) {
		return {
			fields: formData,
			message: "Something went wrong, please try again. | " + error,
		};
	}

	return {
		fields: formData,
		message: "Succesfully edited comment.",
	};
}
//#endregion Comment Editing

//#endregion Comments
