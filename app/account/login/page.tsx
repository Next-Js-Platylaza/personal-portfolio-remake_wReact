import LoginForm from "@/app/ui/account/login-form";
import { Suspense } from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Login",
};

export default function Page() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	);
}
