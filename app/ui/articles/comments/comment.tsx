"use client";
import {
	CommentFormState,
	editComment,
	deleteComment,
} from "@/app/lib/actions";
import { ArticleComment } from "@/app/lib/definitions";
import { useActionState, useEffect, useState } from "react";

export default function CommentComponent({
	comment,
	username,
	additionalClasses,
	activeUserId,
}: {
	comment: ArticleComment;
	username: string | null | undefined;
	additionalClasses?: string;
	activeUserId?: string | null;
}) {
	//#region Edit Form
	const initialEditFormData = new FormData();
	initialEditFormData.set("article_id", "");
	initialEditFormData.set("comment_id", "");
	initialEditFormData.set("text", "");

	const initialEditState: CommentFormState = {
		fields: initialEditFormData,
		errors: {},
		message: null,
	};
	const [editState, editFormAction] = useActionState(
		editComment,
		initialEditState,
	);
	//#endregion Edit Form
	//#region Delete Form
	const initialDeleteFormData = new FormData();
	initialDeleteFormData.set("comment_id", "");

	const initialDeleteState: CommentFormState = {
		fields: initialDeleteFormData,
		errors: {},
		message: null,
	};
	const [deleteState, deleteFormAction] = useActionState(
		deleteComment,
		initialDeleteState,
	);
	//#endregion Delete Form

	function handleClick() {
		if (activeUserId && activeUserId == comment.user_id) {
			setOpen((o) => !o);
		}
	}
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (editState.fields.get("sent") == "true") {
			setOpen(false);
		}
	}, [editState.fields]);

	const buttonClass =
		"text-sm text-white mx-auto mb-2 w-[50%] min-w-20 max-w-40 bg-[#848b98] border-2 border-gray-500 rounded-lg shadow-md hover:border-gray-600 hover:bg-gray-500 active:outline-none active:ring-1 active:ring-gray-600 active:ring-opacity-50";

	return (
		<div
			className={`min-w-[115px] bg-gray-100 border-2 border-gray-300 rounded-[10px] ml-auto mb-1 mr-1 px-[0.6rem] ${additionalClasses}`}
		>
			{open ? (
				<form action={editFormAction}>
					<textarea
						id="text"
						name="text"
						maxLength={100}
						placeholder="Type comment here."
						defaultValue={comment.text}
						className="w-full text-center wrap-anywhere"
					/>
					<input
						hidden
						readOnly
						id="comment-id"
						name="comment-id"
						value={comment.id}
					/>
					<input
						hidden
						readOnly
						id="article-id"
						name="article-id"
						value={comment.article_id}
					/>
					<div className="flex w-full">
						<div className="flex gap-1">
							<button
								type="button"
								onClick={handleClick}
								className={buttonClass}
							>
								Cancel Edit
							</button>
							<button type="submit" className={buttonClass}>
								Submit Edit
							</button>
						</div>
						<button
							type="submit"
							formAction={deleteFormAction}
							className={`${buttonClass} ml-auto`}
						>
							Permanently Delete
						</button>
						<p className="ml-auto text-right">
							{editState.message == "DisplayError"
								? editState.errors?.text?.at(0)
								: editState.message}
						</p>
					</div>
				</form>
			) : username == "fallback" ? (
				<div className={` min-w-50 min-h-10 w-full h-full`}>
					<q className="text-center wrap-anywhere"></q>
					<p className={`text-right -mt-2 mr-3 text-sm`}> - ____</p>
				</div>
			) : (
				<button
					onClick={handleClick}
					className={`text-left w-full h-full ${open && "text-sm"}`}
				>
					<q className="text-center wrap-anywhere">{comment.text}</q>
					<p className={`text-right -mt-2 mr-3 text-sm`}>
						- {username ?? "Unknown"}
					</p>
				</button>
			)}
		</div>
	);
}
