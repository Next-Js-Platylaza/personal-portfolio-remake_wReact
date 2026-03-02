"use server";
import { Recipe } from "./definitions";
import { getCurrentUserId, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { error } from "console";

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

const RecipeFormSchema = z.object({
	id: z.uuid(),
	title: z
		.string({ error: "Please enter a title." })
		.min(2, { error: "Title must contain 2 or more characters" })
		.max(55, { error: "Title must be 55 characters or shorter" }),
	image: z.httpUrl({ error: "Please enter a valid url." }).refine(
		(url) => {
			// Regular expression to check for common image file extensions
			const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
			return imageExtensions.test(url);
		},
		{
			message:
				"URL must point to a valid image file (jpg, jpeg, png, gif, webp, svg).",
		},
	),
	ingredients: z.array(z.string({ error: "Please input a valid password." })),
	steps: z.array(z.string({ error: "Please input a valid password." })),
	date: z.string(),
});

const CreateRecipe = RecipeFormSchema.omit({ id: true });
const UpdateRecipe = RecipeFormSchema.omit({});

export type RecipeFormState = {
	fields: FormData;
	errors?: {
		title?: string[];
		image?: string[];
		ingredients?: string[];
		steps?: string[];
	};
	message?: string | null;
};

export async function createRecipe(
	prevState: RecipeFormState | undefined,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = CreateRecipe.safeParse({
		id: formData.get("id"),
		title: formData.get("title"),
		image: formData.get("image"),
		ingredients: formData.getAll("ingredients"),
		steps: formData.getAll("steps"),
		date: formData.get("date"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to create recipe.",
		};
	}

	// Prepare data for insertion into the database
	const uuid = uuidv4();
	const user_id = (await getCurrentUserId()) ?? "Failed To Get UserID.";

	const { title, image, ingredients, steps, date } = validatedFields.data;
	// Insert data into the database
	try {
		await sql`
			INSERT INTO recipes (id, title, image, ingredients, steps, user_id, date, edit_date)
			VALUES (${uuid}, ${title}, ${image}, ${ingredients}, ${steps}, ${user_id}, ${date}, ${date})
		  `;
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			fields: formData,
			message:
				"Database Error: Failed to create recipe. | Error: " + error,
		};
	}

	/*return { // Added for fixing timezone issues
		fields: formData,
		message: "Remove this you silly goose. | Date: " + date,
	};*/

	// Revalidate the cache for the recipes page and redirect the user.
	revalidatePath(`/recipes/${uuid}/view`);
	redirect(`/recipes/${uuid}/view`);
}

export async function editRecipe(
	prevState: RecipeFormState | undefined,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = UpdateRecipe.safeParse({
		id: formData.get("id"),
		title: formData.get("title"),
		image: formData.get("image"),
		ingredients: formData.getAll("ingredients"),
		steps: formData.getAll("steps"),
		user_id: formData.get("user_id"),
		date: formData.get("date"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to update recipe.",
		};
	}

	// Prepare data for insertion into the database

	const { id, title, image, ingredients, steps, date } = validatedFields.data;
	// Insert data into the database
	try {
		await sql`
			UPDATE recipes 
			SET title = ${title}, image = ${image}, ingredients = ${ingredients}, steps = ${steps}, edit_date = ${date}
			WHERE id = ${id};
		  `;
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			fields: formData,
			message: "Database Error: Failed to update recipe.",
		};
	}

	// Revalidate the cache for the recipes page and redirect the user.
	revalidatePath(`/recipes/${id}/view`);
	redirect(`/recipes/${id}/view`);
}

export async function deleteRecipe(
	prevState: { message: string; error: string } | undefined,
	formData: FormData,
) {
	const id = (formData.get("id") as string) ?? "Failed To Get Recipe ID";

	try {
		await sql`
            DELETE
            FROM recipes
			WHERE id = ${id}
			AND user_id = ${(await getCurrentUserId()) ?? "Failed To Get UserID"}
        `;

		return {
			message: "Successfully deleted recipe!",
			error: "",
		};
	} catch (err) {
		console.error("Database Error:", err);
		return {
			message: "",
			error: "Failed to delete user's recipe. | Error: " + err,
		};
	}
}
