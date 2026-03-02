import { fetchRecipesByUser, fetchRecipesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/recipes/paginiation";
import { getCurrentUserId } from "@/auth";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "My Recipes",
};

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
		items?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const itemsPerPage = Number(searchParams?.items) || 5;
	const recipes = await fetchRecipesPages(query, itemsPerPage);

	const userId = await getCurrentUserId();
	const userHasRecipes = (await fetchRecipesByUser(`${userId}`))[0] != null;

	return (
		<div className="bg-gray-200 min-h-[450px] min-w-[650px] w-[80%] border-gray-400 border-6 p-2 my-5 mx-auto">
			<Pagination
				currentPage={currentPage}
				recipesPerPage={itemsPerPage}
				recipes={recipes}
				userHasRecipes={userHasRecipes}
			/>
		</div>
	);
}
