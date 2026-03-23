import {
	fetchComment,
	fetchUser,
} from "@/app/lib/data";

export default async function CommentComponent({
	id,
	additionalClasses,
}: {
	id: string;
	additionalClasses?: string;
}) {
	const comment = await fetchComment(id);
	const commenter = await fetchUser("id", comment.user_id);

	return (
		<div className={`bg-gray-100 border-2 border-gray-300 rounded-[10px] ml-auto mb-1 mr-1 px-[0.6rem] ${additionalClasses}`}>
			<q className="text-center wrap-anywhere">
				{comment.text}
			</q>
			<p className="text-right -mt-2 mr-8">
				- {commenter ? commenter.name : "Unknown"}
			</p>
		</div>
	);
}
