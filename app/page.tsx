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
						<p>Sign in to get started.</p>
						<hr className="border-black border-1 w-[75%]"/>
						<p>You are welcome to use this pre-populated account for testing</p>
						<p className="text-sm -mt-4">{'(It has about 60 recipes, most of which are quickly made fillers.)'}</p>
						<ul>
							<li>Username: ExampleUser</li>
							<li>Email: example@user.com</li>
							<li>Password: abc123</li>
						</ul>
					</>}
				</main>
			</div>
		</div>
	);
}
