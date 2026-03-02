import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { fetchUser } from "./app/lib/data";
import bcrypt from "bcrypt";

function parseCredentials(
	emailIsUsername: boolean,
	credentials: Partial<Record<string, unknown>>,
): z.ZodSafeParseResult<{
	email: string;
	password: string;
}> {
	if (emailIsUsername) {
		// Parse credentials for username
		return z
			.object({
				email: z.string(),
				password: z.string().min(5).max(25),
			})
			.safeParse(credentials);
	} else {
		// Parse credentials for email instead if it's the used method
		return z
			.object({
				email: z.email(),
				password: z.string().min(5).max(25),
			})
			.safeParse(credentials);
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const usedUsernameMethod = !(
					credentials.email as string
				).includes("@");
				const parsedCredentials = parseCredentials(
					usedUsernameMethod,
					credentials,
				);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await fetchUser(
						usedUsernameMethod ? "name" : "email",
						email.toLowerCase(),
					);

					if (!user) return null;
					const passwordsMatch = await bcrypt.compare(
						password,
						user.password,
					);

					if (passwordsMatch) return user;
				}

				console.log("Invalid credentials");
				return null;
			},
		}),
	],
});

export async function getCurrentUserId() {
	const session = await auth();
	if (!session?.user) return null;

	const user = session?.user
		? await fetchUser("email", session.user.email as string)
		: null;

	return user?.id;
}

export async function getCurrentUserName() {
	const session = await auth();
	if (!session?.user) return null;

	const user = session?.user
		? await fetchUser("email", session.user.email as string)
		: null;

	return user?.name;
}
