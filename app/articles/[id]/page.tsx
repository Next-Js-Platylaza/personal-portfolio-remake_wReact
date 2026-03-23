import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";
import {
	fetchArticle,
	fetchCommentsByArticle,
} from "@/app/lib/data";
import Comment from "@/app/ui/articles/comments/comment";
import AddComment from "@/app/ui/articles/comments/addComment";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home(props: { params: Promise<{ id: string }> }) {
	const userId = await getCurrentUserId();
	const articleID = (await props.params).id;

	const article = await fetchArticle(articleID);
	const comments = (await fetchCommentsByArticle(articleID)).slice(-7);

	return (
		<div className='h-screen font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
			<div className="w-full h-full">
				<Navbar>{<></>}</Navbar>
				<div className="w-full h-full items-center justify-items-center mt-15">
					<main className="w-full h-full row-start-2 ">
						<div className="flex flex-col flex-1 max-w-[900px] min-w-[550px] w-[55%] h-[75%] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 m-auto lg:min-w-[650px]">
							<h1 className="ml-5 text-3xl">{`${article.title}`}</h1>
							<p className="mt-1 ml-2">{article.text}</p>
							<div className="flex flex-row mt-auto mb-1 px-1">
								{userId && <AddComment article_id={articleID}/>}
								<div className="mt-auto ml-auto pl-[0.6rem]">
									{comments.map((comment)=>{
										return <Comment key={comment.id} id={comment.id}/>
									})}
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
