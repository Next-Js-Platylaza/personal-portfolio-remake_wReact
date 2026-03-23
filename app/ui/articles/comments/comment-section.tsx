"use client";
import AddComment from "./addComment";
import Comment from "./comment";
import { ArticleComment } from "@/app/lib/definitions";
import { useState } from "react";

export default function CommentSection({
	user_id,
	article_id,
	comments,
}: {
	user_id: string | null | undefined;
	article_id: string;
	comments: ArticleComment[];
}) {
	const [ownComment, setOwnComment] = useState({id: "-1", article_id: article_id, user_id: user_id, text: ""} as ArticleComment);
	return (
		<div className="flex flex-row mt-auto mb-1 px-1">
			{user_id && <AddComment setOwnComment={setOwnComment} article_id={article_id}/>}
				<div className="mt-auto ml-auto pl-[0.6rem]">
				{comments.map((comment)=>{
					return <Comment key={comment.id} comment={comment}/>
				})}
				{ownComment.text != "" && <Comment comment={ownComment}/>}
			</div>
		</div>
	);
}
