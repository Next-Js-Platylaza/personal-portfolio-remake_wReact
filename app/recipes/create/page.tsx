import CreateRecipeForm from "@/app/ui/recipes/create-form";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Create New Recipe",
};

export default function Page() {
	return (
		<div>
			<CreateRecipeForm />
		</div>
	);
}
