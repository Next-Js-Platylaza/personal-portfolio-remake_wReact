import postgres, { RowList } from "postgres";
import { User, Recipe } from "./definitions";
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

export async function fetchRecipeById(id: string) {
	try {
		const recipes = await sql<Recipe[]>`
            SELECT
            *
            FROM recipes
			WHERE id = ${id}
            ORDER BY title ASC
        `;

		return recipes[0];
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch user's recipes.");
	}
}
export async function fetchRecipesByUser(userId: string) {
	try {
		const recipes = await sql<Recipe[]>`
            SELECT
            *
            FROM recipes
			WHERE user_id = ${userId}
            ORDER BY title ASC
        `;

		return recipes;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch user's recipes.");
	}
}

export async function fetchRecipesPages(query: string, itemsPerPage: number) {
	const userId = (await getCurrentUserId()) ?? "Failed To Fetch UserID";
	try {
		const recipes = await sql<Recipe[]>`
			SELECT *
    		FROM recipes
    		WHERE
      			(title ILIKE ${`%${query}%`} OR
      			date::text ILIKE ${`%${query}%`})
	  			AND user_id = ${userId}
			ORDER BY edit_date DESC;
  		`;

		return recipes;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipes from search.");
	}
}
