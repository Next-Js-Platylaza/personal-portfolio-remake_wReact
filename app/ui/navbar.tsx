import { signOut, getCurrentUserName } from "@/auth";
import NavLinks from "@/app/ui/nav-links";
import Link from "next/link";
import SignInButton from "./sign-in-button";
import WeatherComponent from "./weather";

export default async function Navbar({
	children,
}: {
	children: React.ReactNode;
}) {
	const userName = await getCurrentUserName();
	const signInSignOutClass =
		"flex ml-[5px] my-auto h-[60px] min-w-[100px] w-auto grow items-center justify-center rounded-md bg-gray-50 border-gray-200 border-2 p-3 text-sm font-medium hover:bg-sky-100 hover:border-sky-200 hover:text-blue-600 md:flex-none md:p-2 md:px-3";

	return (
		<div className="flex w-full bg-gray-300 border-2 border-gray-400 p-2">
			<NavLinks />
			{children}
			<div className={`flex gap-2 max-md:gap-0 max-lg:gap-1 md:ml-auto`}>
				<WeatherComponent />
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
					<SignInButton />
				)}
			</div>
		</div>
	);
}
