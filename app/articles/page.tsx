import Navbar from "@/app/ui/navbar";

import { Metadata } from "next";
import { fetchArticles } from "@/app/lib/data";
import Footer from "@/app/ui/footer";
import Article from "@/app/ui/articles/article";
import Comment from "@/app/ui/articles/comments/comment";
import { Suspense } from "react";
import { ArticleComment } from "../lib/definitions";
export const metadata: Metadata = {
	title: "Articles | Logan Blank's Portfolio Page",
};

export default async function Home() {
	const articles = await fetchArticles();
	const articleClass =
		"flex flex-col max-w-[425px] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 mx-auto mt-5";

	const fallbackArticle = (
		<div className={articleClass}>
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
		<>
			<div className="h-screen font-[450] not-italic bg-[#dddddd]">
				<div className="w-full h-[90%]">
					<Navbar>{<></>}</Navbar>
					<div className="w-full h-full items-center justify-items-center mt-15">
						<main className="w-full h-full row-start-2 ">
							<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-2xl text-center mb-5'>
								- My Articles -
							</h1>
							<div className="w-[85%] h-70 min-w-[450px] border-2 border-gray-400 rounded-[8px] bg-[#eaeaea] mx-auto max-lg:h-153 max-lg:w-[55%]">
								<div className="flex gap-3 h-63 p-[8pt] max-lg:flex-col max-lg:gap-0 max-lg:p-0">
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
												<Article
													key={key}
													slug={art.url_slug}
													className={articleClass}
												/>
											);
										})}
									</Suspense>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
