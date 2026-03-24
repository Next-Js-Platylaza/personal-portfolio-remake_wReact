import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";
import { fetchArticleBySlug, fetchCommentsByArticle } from "@/app/lib/data";
import { Metadata } from "next";
import CommentSection from "@/app/ui/articles/comments/comment-section";
import { Suspense } from "react";
import AddComment from "@/app/ui/articles/comments/addComment";
import Comment from "@/app/ui/articles/comments/comment";
import { ArticleComment } from "@/app/lib/definitions";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home(props: {
	params: Promise<{ slug: string }>;
}) {
	const userId = await getCurrentUserId();
	const articleSlug = decodeURIComponent((await props.params).slug);

	const article = await fetchArticleBySlug(articleSlug);
	const comments = (await fetchCommentsByArticle(article.id)).slice(-7);

	let fallbackComments = [];
	for (let i = 0; i < 7; i++) {
		fallbackComments.push(
			<Comment
				key={i + "-comment"}
				comment={{} as ArticleComment}
				username={"fallback"}
			/>,
		);
	}

	return (
		<div className='h-screen font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
			<div className="w-full h-full">
				<Navbar>{<></>}</Navbar>
				<div className="w-full h-full items-center justify-items-center mt-15">
					<main className="w-full h-full row-start-2 ">
						<div className="flex flex-col flex-1 max-w-[900px] min-w-[550px] w-[55%] h-[75%] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 m-auto lg:min-w-[650px] max-xl:min-h-[720px]">
							<h1 className="ml-5 text-3xl">{`${article.title}`}</h1>
							<p className="mt-1 ml-2">{article.text}</p>

							<div className="flex flex-row mt-auto mb-1 px-1">
								<Suspense
									fallback={
										<div className="flex flex-row mt-auto mb-1 px-1 w-full">
											<div className="mt-auto ml-auto pl-[0.6rem]">
												{fallbackComments}
											</div>
										</div>
									}
								>
									<CommentSection
										user_id={userId}
										article_id={article.id}
										comments={comments}
									/>
								</Suspense>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
