import { fetchArticles, fetchCommentsByArticle, fetchUser } from "../lib/data";
import Article from "./article";

export default async function ArticlesSection() {
	const articles = await fetchArticles();
	const comments = await fetchCommentsByArticle(1);

	const mostRecentComment = comments.at(-1);

	const mostRecentCommenter = await fetchUser(
		"id",
		`${mostRecentComment?.user_id}`,
	);

	return (
		<div
			id="articles"
			className="flex gap-3 w-[85%] h-63 border-2 border-gray-400 bg-[#eaeaea] p-3 py-[8pt] rounded-[8px] mx-auto"
		>
			{articles.map((art) => {
				const key: string = `li-${art.title}`;
				return <Article key={key} id={art.id} />;
			})}
		</div>
	);
}
