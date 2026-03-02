import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Home Page",
};

export default async function Home() {
	const userId = await getCurrentUserId();
	return (
		<div className="h-screen">
			<Navbar>{<></>}</Navbar>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[74%]">
				<main className="flex flex-col gap-[16px] row-start-2 items-center">
					<h1>Home Page.</h1>
					{!userId && <>
						<hr className="border-black border-1 w-[75%]"/>
						<p>Sign in to get started.</p></>}
				</main>
			</div>
		</div>
	);
}
