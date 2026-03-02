import { fetchRecipeById } from "@/app/lib/data";
import EditRecipeForm from "@/app/ui/recipes/edit-form";
import { getCurrentUserId } from "@/auth";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const recipe = await fetchRecipeById((await props.params).id);
  return {
    title: `Edit Recipe | ${recipe.title}`,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;
	const userId = await getCurrentUserId();

	const recipe = await fetchRecipeById(id);
	if (!recipe || recipe.user_id != userId) redirect(`../${id}`);

	return (
		<>
			<EditRecipeForm recipe={recipe} />
		</>
	);
}
