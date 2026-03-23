import Link from "next/link";
import { fetchArticles } from "@/app/lib/data";
import ArticleComponent from "./article";
import StyleClasses from "@/app/lib/style-classes";

export default async function ArticlesSection() {
	const articles = await fetchArticles();

	return (
		<div
			id="articles"
			className="w-[85%] h-70 border-2 border-gray-400 rounded-[8px] bg-[#eaeaea] mx-auto"
		>
			<div className="flex gap-3 h-63 p-3 py-[8pt] mt-auto">
				{articles.map((art) => {
					const key: string = `li-${art.title}`;
					return <ArticleComponent key={key} slug={art.url_slug} />;
				})}
			</div>
			<div className="-mt-1 h-6 text-center">
				<Link
					href="/articles"
					className={`${StyleClasses.linkClass} mt-1`}
				>
					See All
				</Link>
			</div>
		</div>
	);
}
