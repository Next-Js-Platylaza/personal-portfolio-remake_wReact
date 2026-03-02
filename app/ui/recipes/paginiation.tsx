"use client";
import { RowList } from "postgres";
import { Recipe } from "@/app/lib/definitions";
import RecipeCard from "./recipe-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { JSX, useEffect, useRef, useState } from "react";

export default function Pagination({
	currentPage,
	recipesPerPage,
	recipes,
	userHasRecipes,
}: {
	currentPage: number;
	recipesPerPage: number;
	recipes: RowList<Recipe[]>;
	userHasRecipes: boolean;
}) {
	// General Setup
	const params = useSearchParams();
	const amountToSkip = recipesPerPage * (currentPage - 1);
	const pagesCount = Math.ceil(recipes.length / recipesPerPage);
	
	// Create an array of all <RecipeCard>s to display
	const recipesToDisplay: Recipe[] =
		currentPage >= 1
			? recipes.slice(
					amountToSkip,
					Math.min(amountToSkip + recipesPerPage, recipes.length),
			  )
			: [];

	//#region Page Number Buttons
	function pageHref(page: number) {
		return `recipes?page=${page}${
			params.get("items") ? `&items=${params.get("items")}` : ""
		}${params.get("query") ? `&query=${params.get("query")}` : ""}`;
	}

	// TSX Component for a page number
	function PageNumberButton({ page, className, text }: { page: number, className?: string, text: string }) {
		const selectedClass =
			"w-8 h-8 text-lg text-center bg-[#B6BCC5] border-gray-500 border-2";
		const notSelectedClass =
			"w-8 h-8 text-lg text-center bg-gray-300 border-gray-400 border-2 hover:bg-[#B6BCC5] hover:border-gray-500";

		return (
			<Link
				href={pageHref(page)}
				className={
					`${page == currentPage ? selectedClass : notSelectedClass} ${className}`
				}
			>
				{text?.replace("N", `${page}`)}
			</Link>
		) as JSX.Element;
	}

	const [pageButtons, setPageButtons] = useState<JSX.Element[]>([]);
	const pageButtonsRef = useRef<HTMLDivElement>(null);

	// Create an array of page number buttons
    useEffect(() => {
        const handleResize = () => {
			let newPageButtons:	JSX.Element[] = [];
			let pageIDs: number[] = [];

			const maxPages = pageButtonsRef?.current ? Math.floor(pageButtonsRef.current.offsetWidth / 52): 10;
			const aheadPages = pagesCount - currentPage;
			const behindPages = currentPage - 1;

			let idealCenter = Math.floor(maxPages / 2);
			let id = currentPage - idealCenter;

			if (aheadPages < idealCenter) {
				id = pagesCount - (maxPages - 1);
			} else if (behindPages < idealCenter) { 
				id = 1;
			}
			if (id <= 0) id = 1;

			//console.log(`Max: ${maxPages}, Ahead: ${aheadPages}, Behind: ${behindPages}, Center: ${idealCenter}, Start: ${id}`);

			for (let i = 1; i <= pagesCount; i++) {
				if (i > maxPages || id > pagesCount) break;

				pageIDs.push(id);
				id++;
			}

			pageIDs.forEach(id => {
				let text = "N";
				if (id == pageIDs.at(0) && id > 1) text="..N";
				else if (id == pageIDs.at(-1) && id < pagesCount) text="N..";
				newPageButtons.push(<PageNumberButton className="my-auto" key={id} page={id} text={text}/>);
			});

			setPageButtons(newPageButtons);
    	};

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [params]);
	//#endregion Page Number Buttons

	return (
		<>
			{recipesToDisplay?.map((recipe) => {
				return (
					<div key={recipe.id}>
						<RecipeCard recipe={recipe} />
						{recipe.id != recipesToDisplay.at(-1)?.id && <hr />}
					</div>
				);
			})}
			{recipesToDisplay.length <= 0 || currentPage < 1 ? (
				<div className="text-center">
					{!userHasRecipes ? <h1>
								You don't have any recipes yet, create a recipe to see it here.
							</h1> : <>
					{currentPage != 1 ? (
						<>
							<h1>Sorry, no recipes for this page. :/</h1>
							<Link
								href={pageHref(
									currentPage < 1 ? 1 : pagesCount,
								)}
								className="underline text-blue-600 hover:text-blue-800"
							>
								Click here to go to the{" "}
								{currentPage < 1 ? "first" : "last"} page.
							</Link>
						</>
					) : (
							<h1>
								Sorry, no recipes found with that search. :/
							</h1>
					)}</>}
				</div>
			) : (
				<div className="flex ">
					{currentPage > 1 ? (
						<Link
							href={pageHref(currentPage - 1)}
							className="flex ml-10 mr-auto mt-auto w-38 h-10 text-nowrap items-center border-gray-400 border-3 rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-[#B6BCC5] hover:border-gray-500"
						>
							{"<--  "} Previous Page
						</Link>
					) : (
						<div className="flex ml-10 mr-auto mt-auto w-38 h-10"></div>
					)}

					<div ref={pageButtonsRef} className="flex gap-5 mx-8 w-full justify-center max-lg:mx-1 max-lg:gap-4">
						{pagesCount > 1 && pageButtons}
					</div>

					{currentPage < pagesCount ? (
						<Link
							href={pageHref(currentPage + 1)}
							className="flex mr-10 ml-auto mt-auto w-32 h-10 text-nowrap items-center border-gray-400 border-3 rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-[#B6BCC5] hover:border-gray-500"
						>
							Next Page {"-->"}
						</Link>
					) : (
						<div className="flex ml-10 mr-auto mt-auto w-32 h-10"></div>
					)}
				</div>
			)}
		</>
	);
}
