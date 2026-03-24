"use client";
import { CommentFormState, editComment } from "@/app/lib/actions";
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
	activeUserId?: string |null;
}) {
	function handleClick()
	{
		if (activeUserId && activeUserId == comment.user_id)
		{
			setOpen((o) => !o);
		}
	}

	const initialFormData = new FormData();
	initialFormData.set("article_id", "");
	initialFormData.set("user_id", "");
	initialFormData.set("text", "");
	
	const initialState: CommentFormState = {
		fields: initialFormData,
		errors: {},
		message: null,
	};
	const [state, formAction] = useActionState(editComment, initialState);
	
	const [open, setOpen] = useState(false);
	const buttonClass = "text-sm text-white mx-auto mb-2 w-[50%] min-w-20 max-w-30 bg-[#848b98] border-2 border-gray-500 rounded-lg shadow-md hover:border-gray-600 hover:bg-gray-500 active:outline-none active:ring-1 active:ring-gray-600 active:ring-opacity-50";

	useEffect(()=>{
		if (state.fields.get("sent") == "true") {
			setOpen(false);
		}
		console.log(state.fields.get("sent"));
	},[state.fields])

	return (
		<div className={`min-w-[115px] bg-gray-100 border-2 border-gray-300 rounded-[10px] ml-auto mb-1 mr-1 px-[0.6rem] ${additionalClasses}`}>
			{open ? ( <form action={formAction}>
					<textarea 
						id="text"
						name="text"
						maxLength={100}
						placeholder="Type comment here."
						defaultValue={comment.text}
						className="w-full text-center wrap-anywhere"
						/>
						<input hidden readOnly id="comment-id" name="comment-id" value={comment.id}/>
						<input hidden readOnly id="article-id" name="article-id" value={comment.article_id}/>
					<div className="flex w-full">
						<div className="flex gap-1">
							<button
								type="button"
								onClick={handleClick}
								className={buttonClass}
								>Cancel Edit
							</button>
							<button type="submit"
								className={buttonClass}
								>Submit Edit
							</button>
						</div>
						<p className="ml-auto text-right">{state.message == "DisplayError" ? state.errors?.text?.at(0) : state.message}</p>
					</div>
				</form>
				) : <button onClick={handleClick} className={`text-left w-full h-full ${open && "text-sm"}`}>
						<q className="text-center wrap-anywhere">
							{comment.text}
						</q>				
						<p className={`text-right -mt-2 mr-3 text-sm`}>
							- {username ?? "Unknown"}
						</p>
				</button>}
		</div>
	);
}
