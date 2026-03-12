import Link from "next/link";
import {
	fetchArticle,
	fetchCommentsByArticle,
	fetchUser,
} from "@/app/lib/data";

export default async function ArticleComponent({
	id,
	className,
}: {
	id: string;
	className?: string;
}) {
	const article = await fetchArticle(id);
	const comments = await fetchCommentsByArticle(id);

	const mostRecentComment = comments.at(-1);
	const mostRecentCommenter = mostRecentComment
		? await fetchUser("id", `${mostRecentComment?.user_id}`)
		: null;

	const divClass =
		className ??
		"flex flex-col max-w-[325px] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2";

	return (
		<div className={divClass}>
			<Link href={`/articles/${id}`}>
				<h1 className="ml-5 text-xl">{`${article.title}`}</h1>
				<p className="mt-1 ml-2">{article.text}</p>
			</Link>
			{mostRecentComment && (
				<div className="bg-gray-100 border-2 border-gray-300 rounded-[10px] mt-auto ml-auto mb-1 mr-1 px-[0.6rem]">
					<q className=" text-center">{mostRecentComment?.text}</q>
					<p className="text-right -mt-2 mr-8">
						- {mostRecentCommenter?.name}
					</p>
				</div>
			)}
		</div>
	);
}
