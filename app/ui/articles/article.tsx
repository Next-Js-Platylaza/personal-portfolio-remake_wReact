import Link from "next/link";
import { fetchArticleBySlug, fetchCommentsByArticle, fetchUser } from "@/app/lib/data";
import Comment from "@/app/ui/articles/comments/comment";

export default async function ArticleComponent({
	slug,
	className,
}: {
	slug: string;
	className?: string;
}) {
	const article = await fetchArticleBySlug(slug);
	const comments = await fetchCommentsByArticle(article.id);

	const mostRecentComment = comments.at(-1);
	const mostRecentCommenter = await fetchUser("id", mostRecentComment?.user_id ?? "0");

	const divClass =
		className ??
		"flex flex-col max-w-[325px] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2";

	return (
		<div className={divClass}>
			<Link href={`/articles/${article.url_slug}`}>
				<h1 className="ml-5 text-xl">{`${article.title}`}</h1>
				<p className="mt-1 ml-2">{article.text}</p>
			</Link>
			{mostRecentComment && (
				<Comment
					comment={mostRecentComment}
					username={mostRecentCommenter!.name}
					additionalClasses="mt-auto"
				/>
			)}
		</div>
	);
}
