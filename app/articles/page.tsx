import Navbar from "@/app/ui/navbar";

import { Metadata } from "next";
import { fetchArticles } from "@/app/lib/data";
import Footer from "../ui/footer";
import Article from "../ui/articles/article";
import Link from "next/link";
import StyleClasses from "../lib/style-classes";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home() {
	const articles = await fetchArticles();

	return (
		<>
			<div className='h-screen font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
				<div className="w-full h-[90%]">
					<Navbar>{<></>}</Navbar>
					<div className="w-full h-full items-center justify-items-center mt-15">
						<main className="w-full h-full row-start-2 ">
							<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-2xl text-center mb-5'>
								- My Articles -
							</h1>
							<div className="w-[85%] h-70 border-2 border-gray-400 rounded-[8px] bg-[#eaeaea] mx-auto">
								<div className="flex gap-3 h-63 p-[8pt] ">
									{articles.map((art) => {
										const key: string = `li-${art.title}`;
										return (
											<Article
												key={key}
												id={art.id}
												className="flex flex-col max-w-[425px] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 mx-auto mt-5"
											/>
										);
									})}
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
