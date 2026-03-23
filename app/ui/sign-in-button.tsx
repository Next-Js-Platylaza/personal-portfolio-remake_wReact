"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInButton() {
	const pathname = usePathname();
	const signInSignOutClass =
		"flex ml-[5px] my-auto h-[60px] min-w-[100px] w-auto grow items-center justify-center rounded-md bg-gray-50 border-gray-200 border-2 p-3 text-sm font-medium hover:bg-sky-100 hover:border-sky-200 hover:text-blue-600 md:flex-none md:p-2 md:px-3";

	return (
		<Link className={signInSignOutClass} href={`/account/login?callbackUrl=${pathname}`}>
			<div>Sign In</div>
		</Link>
	);
}
