import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";

import { Metadata } from "next";
import {
	fetchArticle,
	fetchCommentsByArticle,
	fetchUser,
} from "@/app/lib/data";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home(props: { params: Promise<{ id: string }> }) {
	const userId = await getCurrentUserId();
	const articleID = (await props.params).id;

	const article = await fetchArticle(articleID);
	const comments = await fetchCommentsByArticle(articleID);

	const mostRecentComment = comments.at(-1);
	const mostRecentCommenter = mostRecentComment
		? await fetchUser("id", `${mostRecentComment?.user_id}`)
		: null;

	return (
		<div className='h-screen font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
			<div className="w-full h-full">
				<Navbar>{<></>}</Navbar>
				<div className="w-full h-full items-center justify-items-center mt-15">
					<main className="w-full h-full row-start-2 ">
						<div className="flex flex-col flex-1 max-w-[900px] min-w-[400px] w-[55%] h-[75%] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 m-auto">
							<h1 className="ml-5 text-3xl">{`${article.title}`}</h1>
							<p className="mt-1 ml-2">{article.text}</p>
							{mostRecentComment && (
								<div className="bg-gray-100 border-2 border-gray-300 rounded-[10px] mt-auto ml-auto mb-1 mr-1 px-[0.6rem]">
									<q className=" text-center">
										{mostRecentComment?.text}
									</q>
									<p className="text-right -mt-2 mr-8">
										- {mostRecentCommenter?.name}
									</p>
								</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
