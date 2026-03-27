import AddComment from "./addComment";
import Comment from "./comment";
import { ArticleComment } from "@/app/lib/definitions";
import { fetchUsers } from "@/app/lib/data";

export default async function CommentSection({
	user_id,
	article_id,
	comments,
}: {
	user_id: string | null | undefined;
	article_id: string;
	comments: ArticleComment[];
}) {
	const usernames = await fetchUsers();

	return (
		<div className="flex flex-row mt-auto mb-1 px-1 w-full">
			{user_id && <AddComment article_id={article_id} />}
			<div className="mt-auto ml-auto pl-[0.6rem]">
				{comments.map((comment, i) => {
					return (
						<Comment
							key={comment.id}
							comment={comment}
							username={
								usernames.find(
									(user) => user.id == comment.user_id,
								)?.name
							}
							activeUserId={user_id}
						/>
					);
				})}
			</div>
		</div>
	);
}
