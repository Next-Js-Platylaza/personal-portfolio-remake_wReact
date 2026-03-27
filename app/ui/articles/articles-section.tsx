import Link from "next/link";
import { fetchArticles } from "@/app/lib/data";
import ArticleComponent from "./article";
import Comment from "./comments/comment";
import StyleClasses from "@/app/lib/style-classes";
import { ArticleComment } from "@/app/lib/definitions";
import { Suspense } from "react";

export default async function ArticlesSection() {
	const articles = await fetchArticles();

	const fallbackArticle = (
		<div className="flex flex-col w-[375px] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 mx-auto mt-5">
			<div>
				<h1 className="ml-5 text-xl">_______</h1>
				<p className="mt-1 ml-2">___________________________</p>
			</div>
			<Comment
				comment={{} as ArticleComment}
				username={"fallback"}
				additionalClasses="ml-auto mt-auto"
			/>
		</div>
	);

	return (
		<div
			id="articles"
			className="w-[85%] h-75 border-2 border-gray-400 rounded-[8px] bg-[#eaeaea] mx-auto"
		>
			<div className="flex gap-3 h-63 p-3 py-[8pt] mt-auto">
				<Suspense
					fallback={
						<>
							{fallbackArticle}
							{fallbackArticle}
							{fallbackArticle}
						</>
					}
				>
					{articles.map((art) => {
						const key: string = `li-${art.title}`;
						return (
							<ArticleComponent key={key} slug={art.url_slug} />
						);
					})}
				</Suspense>
			</div>
			<div className="mt-2 h-6 text-center">
				<Link href="/articles" className={`${StyleClasses.linkClass}`}>
					See All
				</Link>
			</div>
		</div>
	);
}
