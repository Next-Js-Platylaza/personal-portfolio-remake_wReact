import CreateAccountForm from "@/app/ui/account/create-form";
import { Suspense } from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Create Account",
};


export default function Page() {
	return (
		<Suspense>
			<CreateAccountForm />
		</Suspense>
	);
}
