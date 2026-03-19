import { LocationCoords, LocationState, WeatherData } from "./definitions";
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

// NWS API
export async function getWeatherData(coords: string = "41.725, -111.85") {
	// Use coordinates for specific location
	const res = await fetch("https://api.weather.gov/points/" + coords, {
		headers: {
			"User-Agent": "default-agent",
		},
	});

	if (!res.ok) return null;
	const data = await res.json();

	// NWS often requires a second call to get the actual forecast
	const forecastRes = await fetch(data.properties.forecast, {
		headers: {
			"User-Agent": "default-agent",
		},
	});
	const json = await forecastRes.json();
	const period = json.properties.periods[0];
	return {
		temp: `${period.temperature}°${period.temperatureUnit}`,
		word: period.shortForecast,
	} as WeatherData;
}
