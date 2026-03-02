"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SearchInput from "./search-input";

export default function SearchBar({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const setItemsPerPageAmount = useDebouncedCallback((amount: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", searchParams.get("page") ?? "1");
		params.set("items", amount);

		const query = searchParams.get("query");
		if (query) {
			params.set("query", query);
		} else {
			params.delete("query");
		}

		replace(`${pathname}?${params.toString()}`);
	}, 50);
	
	return (
		<div className="flex w-full max-md:w-[500px]">
			<SearchInput placeholder={placeholder} />
			<div className="flex ml-2 w-full max-md:w-[280px]">
				<label htmlFor="items-per-page" className="m-auto bg-gray-100 border-1 border-gray-300 p-1 mr-2 text-sm">Recipes Per Page: </label>
				<input
					id="items-per-page"
					name="items-per-page"
					type="number"
					defaultValue={searchParams.get("items") ?? "5"}
					onChange={(val) => {
						setItemsPerPageAmount(val.target.value);
					}}
					className="w-[40px] h-[50px] rounded-md
						bg-gray-100 border-gray-300 border-2
						hover:bg-gray-200 hover:border-gray-600 text-black py-[9px] text-center text-sm"
					min={1}
					max={50}
				/>
			</div>
		</div>
	);
}
