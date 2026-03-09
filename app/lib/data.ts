import postgres, { RowList } from "postgres";
import { Article, User, ArticleComment } from "./definitions";
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

export async function fetchArticle(id: string) {
	try {
		const article = await sql<Article[]>`
			SELECT * FROM articles WHERE id = ${id}
  		`;

		return article[0];
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch articles.");
	}
}
export async function fetchArticles() {
	try {
		const articles = await sql<Article[]>`
			SELECT * FROM articles
  		`;

		return articles;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch articles.");
	}
}

export async function fetchCommentsByArticle(id: string | number) {
	try {
		const comments = await sql<ArticleComment[]>`
			SELECT * FROM comments WHERE article_id = ${id}
  		`;

		return comments;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch comments.");
	}
}
