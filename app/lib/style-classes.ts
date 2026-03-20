export default class StyleClasses {
	public static readonly linkClass: string =
		"text-blue-600 hover:text-blue-800 visited:text-purple-600 underline";
	public static readonly buttonClass: string = /* 400: #9CA3AF | 500: #6B7280 */
		"px-4 py-2 font-semibold text-white bg-[#848b98] rounded-lg shadow-md hover:bg-gray-500 active:outline-none active:ring-2 active:ring-gray-500 active:ring-opacity-75";
	public static readonly inputFormClass: string =
		"border border-gray-600 p-2 ml-8 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 align-top";
	public static readonly formErrorClass: string =
		"mt-1 ml-5 text-sm text-red-500";
}
