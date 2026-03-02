import postgres, { RowList } from "postgres";
import { User} from "./definitions";
import { getCurrentUserId } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchUser(
	column: string,
	searchValue: string,
): Promise<User | undefined> {
	try {
		let user;
		switch (column) {
			case "name":
				user = await sql<
					User[]
				>`SELECT * FROM users WHERE name = ${searchValue}`;
				break;
			case "email":
				user = await sql<
					User[]
				>`SELECT * FROM users WHERE email = ${searchValue}`;
				break;
			case "id":
				user = await sql<
					User[]
				>`SELECT * FROM users WHERE id = ${searchValue}`;
				break;
			default:
				throw Error(`Failed to fetch user. Unknown column: ${column}`);
		}

		return user[0];
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

export async function fetchUsers() {
	try {
		const users = await sql<User[]>`
            SELECT
            *
            FROM users
            ORDER BY id ASC
        `;

		return users;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch all users.");
	}
}
