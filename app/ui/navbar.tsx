import { signOut, getCurrentUserName } from "@/auth";
import NavLinks from "@/app/ui/nav-links";
import Link from "next/link";
import SignInButton from "./sign-in-button";
import WeatherComponent from "./weather";
import { Suspense } from "react";
import { CrossPageData } from "../lib/api";

export default async function Navbar({
	children,
}: {
	children: React.ReactNode;
}) {
	const userName = await getCurrentUserName();
	const signInSignOutClass =
		"flex ml-[5px] my-auto h-[60px] min-w-[100px] w-auto grow items-center justify-center rounded-md bg-gray-400 border-gray-600 border-2 text-slate-100 p-3 text-sm font-medium active:text-gray-600 active:border-3 active:ring-1 active:font-bold active:ring-gray-400 hover:bg-slate-300 hover:border-gray-400 hover:text-gray-700 md:p-2 md:px-3";

	return (
		<div className="flex w-full bg-[#bbbec3] border-2 border-[#878b92] p-2">
			<NavLinks />
			{children}
			<div className={`flex gap-2 max-md:gap-0 max-lg:gap-1 md:ml-auto`}>
				<Suspense>
					<WeatherComponent />
				</Suspense>
			</div>
			<div className={`flex gap-2 max-md:gap-0 max-lg:gap-1 md:ml-auto`}>
				<Link href="/#contact" className={signInSignOutClass}>
					<div>Contact Me</div>
				</Link>
				{userName != null ? (
					<button
						className={signInSignOutClass}
						onClick={async () => {
							"use server";
							await signOut({});
						}}
					>
						<div>
							Sign Out
							<p className="m-[-1pt] text-xs whitespace-nowrap">{`(${userName})`}</p>
						</div>
					</button>
				) : (
					<SignInButton classes={signInSignOutClass} />
				)}
			</div>
		</div>
	);
}
