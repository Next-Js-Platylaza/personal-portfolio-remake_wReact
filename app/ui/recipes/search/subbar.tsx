"use-client";
import Link from "next/link";
import SearchBar from "./searchbar";
import { Suspense } from "react";

export default async function Subbar() {
	return (
		<div className="flex w-full max-w-[700px] min-w-[10px] bg-[#9999a0] border-2 border-[#6f6f7f] m-auto px-2 pb-2 pt-1">
			<div className="m-auto">
				<Link
					href="/recipes/create"
					className={`flex m-auto h-[40px] w-[110px] grow text-center
					items-center justify-center rounded-md p-3 text-sm font-medium bg-gray-100 border-gray-300 border-2 hover:bg-gray-200 hover:border-gray-500 md:flex-none md:p-2 md:px-3 md:mx-[4px]`}
				>
					<div>Create New</div>
				</Link>
			</div>

			<div className="w-[50px] max-md:w-[8px] m-auto px-2">
				<div className="h-[40px] w-[2px] mx-auto bg-gray-500" />
			</div>
			<Suspense>
				<SearchBar placeholder={"Search..."} />
			</Suspense>
		</div>
	);
}
