"use client";
import { Recipe } from "@/app/lib/definitions";
import { formatDate } from "@/app/lib/util";
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
	const wasEdited =
		recipe.edit_date?.toDateString() != recipe.date?.toDateString();

	return (
		<div className="min-w-[425px]  bg-gray-100 border-gray-300 border-5 py-2 px-3 m-3">
			<div className="flex">
				<Link
					href={`/recipes/${recipe.id}/view`}
					className="flex w-full"
				>
					<div className="w-[106px] h-[106px] relative border-gray-500 border-3 bg-gray-400 items-center mr-4">
						<Image
							src={recipe.image}
							alt="Recipe Thumbnail"
							width={100}
							height={100}
							className="max-w-[100px] max-h-[100px] absolute inset-0 w-auto h-auto m-auto"
						/>
					</div>
					<div className="mr-6 pl-4">
						<h1 className="line-clamp-3 text-lg mb-3 max-md:text-sm max-xl:w-[400px] max-lg:w-[192px] max-md:w-[92px]">
							- {recipe.title}
						</h1>
						<li className="mt-2">
							{recipe.ingredients.length} Ingredient
							{recipe.ingredients.length != 1 ? "s" : ""}
						</li>
						<li className="mt-3">
							{recipe.steps.length} Step
							{recipe.steps.length != 1 ? "s" : ""}
						</li>
					</div>
				</Link>
				<div className="flex ml-auto">
					<div>
						<h4 className="text-nowrap">
							Created:{" "}
							{recipe.date
								? formatDate(recipe.date, "m-d-y")
								: "???"}
						</h4>
						{wasEdited && (
							<h4 className="text-nowrap text-sm">
								Edited:{" "}
								{recipe.edit_date
									? formatDate(recipe.edit_date, "m-d-y")
									: "???"}
							</h4>
						)}
						{/*<h4 className="text-nowrap">Created: {formatDate(recipe.date, "m-d-y")}</h4>
						{ recipe.edit_date != recipe.date &&
						<h4 className="text-nowrap text-sm">Edited: {formatDate(recipe.edit_date, "m-d-y @ h:iin")}</h4>}*/}
						{/*<p className="mt-auto text-sm">{recipe.image}</p>*/}
						<div
							className={`flex ${
								wasEdited ? "h-[62px]" : "h-[82px]"
							}`}
						>
							<Link
								href={`/recipes/${recipe.id}/edit`}
								className="flex ml-auto mt-auto h-10 items-center border-gray-300 border-3 rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 hover:border-gray-400"
							>
								Edit
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
