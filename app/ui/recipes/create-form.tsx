"use client";
import Link from "next/link";
import { createRecipe, RecipeFormState } from "@/app/lib/actions";
import { useActionState, useEffect, useRef } from "react";
import useArrayInput from "./useArrayInput";
import { formatDate } from "@/app/lib/util";

export default function CreateRecipeForm() {
	const initialFormData = new FormData();
	initialFormData.set("id", "");
	initialFormData.set("title", "");
	initialFormData.set("image", "");
	initialFormData.append("ingredients", "");
	initialFormData.append("steps", "");
	initialFormData.set("user_id", "");

	const [state, formAction] = useActionState(createRecipe, {
		fields: initialFormData,
		message: null,
		errors: {},
	} as RecipeFormState);

	const arrayInputStyles = {
		input: "w-[425px]",
		fieldset: "border border-gray-400 px-3 pt-1 pb-3 mt-2 mb-3 rounded-md",
		legend: "px-4 text-lg font-semibold text-gray-700",
		addButton:
			"py-1 px-3 mt-2 rounded-lg bg-gray-200 border-gray-400 border-2 text-sm text-gray-900 transition-colors hover:bg-gray-300",
		removeButton:
			"py-1 px-2 ml-auto mr-4 mt-1 rounded-lg bg-gray-200 border-gray-400 border-2 text-sm text-gray-900 transition-colors hover:bg-gray-300",
	};

	const [ingredientsInput, refillInputs_Ingredients] = useArrayInput({
		label: "ingredient",
		key: "ingredients-array",
		defaultValues: state.fields.getAll("ingredients") as string[],
		styles: arrayInputStyles,
		inputMinMaxLength: [1, 50],
	});
	const [stepsInput, refillInputs_Steps] = useArrayInput({
		label: "step",
		key: "steps-array",
		defaultValues: state.fields.getAll("steps") as string[],
		styles: arrayInputStyles,
		inputMinMaxLength: [1, 100],
	});

	//console.log(formatDate(new Date(), "y-mm-dd hh:ii:ss"));

	// Refill inputs with their values after form submission (because form submission clears all inputs)
	useEffect(() => {
		refillInputs_Ingredients();
		refillInputs_Steps();
	}, [state.errors]);

	const titleInputRef = useRef<HTMLInputElement>(null);
	useEffect(()=>{
		titleInputRef.current?.focus();
	}, [])

	return (
		<form action={formAction}>
			<div className="rounded-md border-[2px] border-gray-300 w-[65%] min-w-[635px] m-auto bg-gray-100 p-4 md:p-6">
				{/* Title */}
				<div className="mb-4">
					<label
						htmlFor="title"
						className="mb-2 block text-sm font-medium"
					>
						Enter title
					</label>
					<div className="relative">
						<input
							ref={titleInputRef}
							id="title"
							name="title"
							type="text"
							placeholder="Ex: My Amazing Recipe"
							defaultValue={state.fields.get("title") as string}
							required={true}
							className="w-full rounded-md border border-gray-50 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 focus:outline-2"
							aria-describedby="title-error"
						/>
					</div>
					<div id="title-error" aria-live="polite" aria-atomic="true">
						{state.errors?.title &&
							state.errors.title.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>

				{/* Image */}
				<div className="mb-4">
					<label
						htmlFor="image"
						className="mb-2 block text-sm font-medium"
					>
						Enter image link
					</label>
					<div className="relative">
						<input
							id="image"
							name="image"
							type="text"
							placeholder="Ex: https://www.website.com/image.jpg"
							defaultValue={state.fields.get("image") as string}
							required={true}
							className="w-full rounded-md border border-gray-50 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 focus:outline-2"
							aria-describedby="image-error"
						/>
					</div>
					<div id="image-error" aria-live="polite" aria-atomic="true">
						{state.errors?.image &&
							state.errors.image.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
				<hr />
				{ingredientsInput}
				<hr />
				{stepsInput}

				<p className="mt-2 text-sm text-red-500">{state.message}</p>
				<input
					type="hidden"
					name="date"
					value={formatDate(new Date(), "y-mm-dd hh:ii:ss")}
				/>

				<div className="mt-6 -mb-2 flex justify-end gap-4">
					<Link
						href="/recipes"
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Create Recipe
					</button>
				</div>
			</div>
		</form>
	);
}
