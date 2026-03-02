import { signOut, getCurrentUserName } from "@/auth";
import NavLinks from "@/app/ui/nav-links";
import Link from "next/link";

export default async function Navbar({
	children,
}: {
	children: React.ReactNode;
}) {
	const userName = await getCurrentUserName();
	const signInSignOutClass =
		"flex ml-[5px] my-auto h-[60px] min-w-[100px] w-auto grow items-center justify-center rounded-md bg-gray-50 border-gray-200 border-2 p-3 text-sm font-medium hover:bg-sky-100 hover:border-sky-200 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:ml-auto";

	return (
		<div className="flex w-full bg-gray-300 border-2 border-gray-400 p-2">
			<NavLinks />
			{children}
			{userName != null ? (
				<button
					className={signInSignOutClass}
					onClick={async () => {
						"use server";
						await signOut({ redirectTo: "/" });
					}}
				>
					<div>
						Sign Out
						<p className="m-[-1pt] text-xs whitespace-nowrap">{`(${userName})`}</p>
					</div>
				</button>
			) : (
				<Link href="account/login" className={signInSignOutClass}>
					<div>Sign In</div>
				</Link>
			)}
		</div>
	);
}
