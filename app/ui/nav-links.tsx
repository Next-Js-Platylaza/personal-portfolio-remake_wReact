"use client";

import Link from "next/link";
import { LinkStructure } from "../lib/definitions";
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
		name: "Recipes",
		href: "/recipes",
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
						className={clsx(
							"flex h-[60px] w-[200px] p-auto m-1 grow items-center justify-center gap-2 rounded-md bg-gray-50 border-gray-200 border-2 p-3 text-sm font-medium hover:bg-sky-100 hover:border-sky-200 hover:text-blue-600 md:flex-none",
							{
								"bg-sky-100 border-sky-200 text-blue-600":
									pathname === link.href,
							},
						)}
					>
						<p className="md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
