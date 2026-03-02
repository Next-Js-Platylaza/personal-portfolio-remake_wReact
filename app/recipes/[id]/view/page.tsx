import { fetchRecipeById } from "@/app/lib/data";
import { Recipe } from "@/app/lib/definitions";
import { getCurrentUserId } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect as redirectTo } from "next/navigation";

import { Metadata } from "next";
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const recipe = await fetchRecipeById((await props.params).id);
  return {
    title: `View Recipe | ${recipe.title}`,
  };
}

let pageId: string;
export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	pageId = params.id;

	let recipe: Recipe;
	try {
		recipe = await fetchRecipeById(pageId);
	} catch {
		redirectTo(`../${pageId}`);
	}

	const userId = await getCurrentUserId();
	if (recipe.user_id != userId) redirectTo(`../${pageId}`);

	return (
		<div className="rounded-md border-[2px] border-gray-300 w-[65%] min-w-[635px] m-auto bg-gray-100 px-7 py-5">
			<div>
				<div className="flex">
					<div className="w-[156px] h-[156px] relative border-gray-500 border-3 bg-gray-400 mr-4">
						<Image
							src={recipe.image}
							alt="Recipe Thumbnail"
							width={150}
							height={150}
							className="max-w-[150px] max-h-[150px] absolute inset-0 w-auto h-auto m-auto"
						/>
					</div>
					<div className="ml-auto mr-[1%]">
						<h1 className="text-2xl">- {recipe.title}</h1>
						<h4 className="text-lg text-center">Created: {recipe.date.toDateString()}</h4>
						<h4 className="text-sm text-center">Last Edited: {recipe.edit_date.toDateString()}</h4>
					</div>		
				</div>
				<div className="flex gap-4 mt-5">
					<div className="w-[45%] ml-10 pl-8">
						<h2 className="text-lg font-bold">- Ingredients:</h2>
						<ul className="list-disc">
							{recipe.ingredients.map((ingredient) => {
								return <li key={ingredient}>{ingredient}</li>;
							})}
						</ul>
					</div>
					<div className="w-[45%] ml-auto mr-10 pl-8">
						<h2 className="text-lg font-bold">- Steps:</h2>
						<ol className="list-decimal">
							{recipe.steps.map((step) => {
								return <li key={step}>{step}</li>;
							})}
						</ol>
					</div>		
				</div>			
				<div className="mt-6 flex justify-end gap-4">
					<Link
						href={`/recipes`}
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Back
					</Link>
					<Link
						href={`/recipes/${pageId}/edit`}
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Edit
					</Link>
				</div>
			</div>
		</div>
		
	);
}
