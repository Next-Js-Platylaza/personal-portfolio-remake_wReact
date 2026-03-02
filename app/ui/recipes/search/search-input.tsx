"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		console.log(`Searching... ${term}`);

		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const buttonClass = `flex ml-[5px] my-auto h-[40px] grow text-center
		items-center justify-center rounded-md text-sm font-medium
		bg-gray-100 border-gray-300 border-2 hover:bg-gray-200 hover:border-gray-500 md:flex-none md:p-2 md:px-3 md:mr-[4px]`;

	return (
		<div className="flex ml-auto max-md:w-full">
			<label htmlFor="searchbar" className="sr-only">
				Search
			</label>
			<input
				className={`w-[340px] max-w-full max-md:w-[150px] text-left ${buttonClass}`}
				id="searchbar"
				name="searchbar"
				type="text"
				placeholder={placeholder}
				maxLength={50}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
		</div>
	);
}
