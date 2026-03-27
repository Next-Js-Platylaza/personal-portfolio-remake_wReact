"use client";

import Link from "next/link";
import { LinkStructure } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links: LinkStructure[] = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Projects",
		href: "/projects",
	},
	{
		name: "Articles",
		href: "/articles",
	},
];

export default function NavLinks() {
	const pathname = usePathname();
	return (
		<>
			{links.map((link) => {
				return (
					<Link
						key={link.name}
						href={link.href}
						className={`flex h-[60px] max-lg:max-w-[170px] w-[200px] p-auto m-1 grow items-center justify-center gap-2 rounded-md border-2 p-3 text-sm font-medium active:text-gray-600 active:border-3 active:ring-1 active:font-bold active:ring-gray-400 hover:bg-slate-300 hover:border-gray-400 hover:text-gray-700 lg:flex-none ${
							pathname === link.href
								? "bg-slate-300 border-gray-400 text-gray-700"
								: "bg-gray-400 border-gray-600 text-slate-100"
						}`}
					>
						<p className="md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
