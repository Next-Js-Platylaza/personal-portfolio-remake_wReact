"use client";
import { useActionState, useEffect, useState, } from "react";
import { CommentFormState, createComment } from "@/app/lib/actions";
import StyleClasses from "@/app/lib/style-classes";

export default function AddCommentComponent({
	article_id,
}: {
	article_id: string;
}) {
	const initialFormData = new FormData();
	initialFormData.set("article_id", "");
	initialFormData.set("user_id", "");
	initialFormData.set("text", "");

	const initialState: CommentFormState = {
		fields: initialFormData,
		errors: {},
		message: null,
	};
	const [state, formAction] = useActionState(createComment, initialState);

	const [text, setText] = useState<string>("");
  	const maxLength = 100;

  	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  		setText(e.target.value);
	}
	useEffect(()=>{
		if (state.message?.includes("Succes")) {
			setText("");
		}
	}, [state.fields])

	return (
		<div className="mt-auto">
			<h3 className="w-25 ml-5 pt-1">Add Comment:</h3>
			<form action={formAction} className="flex flex-col max-w-[242px] bg-gray-50 border-2 border-gray-300 rounded-[10px] px-[0.6rem]">
				<textarea id="text" name="text" onChange={handleChange} maxLength={maxLength} defaultValue={state.fields.get("text") as string} className={`my-2 ml-auto h-22 w-55 max-lg:w-28 bg-gray-100 ${StyleClasses.inputFormClass}`}/>
				<input hidden readOnly id="article-id" name="article-id" value={article_id}/>
				<p className="text-sm text-gray-500 ml-auto mb-1 -mt-2">
        			{text.length} / {maxLength} characters
      			</p>
				<button type="submit"
					className="text-white mx-auto mb-2 w-[50%] min-w-20 bg-[#848b98] border-2 border-gray-500 rounded-lg shadow-md hover:border-gray-600 hover:bg-gray-500 active:outline-none active:ring-1 active:ring-gray-600 active:ring-opacity-50"
					>Post Comment</button>
			</form>
			<p>{state.message == "DisplayError" ? state.errors?.text?.at(0) : state.message}</p>
		</div>
	);
}
