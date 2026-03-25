"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInButton({ classes }: { classes: string }) {
	const pathname = usePathname();

	return (
		<Link
			className={classes}
			href={`/account/login?callbackUrl=${pathname}`}
		>
			<div>Sign In</div>
		</Link>
	);
}
