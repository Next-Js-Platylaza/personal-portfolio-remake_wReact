import Navbar from "@/app/ui/navbar";

import { Metadata } from "next";
import {
	fetchArticle,
	fetchCommentsByArticle,
	fetchUser,
} from "@/app/lib/data";
import Footer from "@/app/ui/footer";
import Project from "@/app/ui/projects/project";
import { ProjectStructure } from "@/app/lib/definitions";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

// Move to database
const projects: ProjectStructure[] = [
	{
		id: 1,
		linkAddress: "#",
		title: "Project 1",
		description: "This is the 1st project's description.",
	},
	{
		id: 2,
		linkAddress: "#",
		title: "Project 2",
		description: "This is the 2nd project's description.",
	},
	{
		id: 3,
		linkAddress: "#",
		title: "Project 3",
		description: "This is the 3rd project's description.",
	},
	{
		id: 4,
		linkAddress: "#",
		title: "Project 4",
		description: "This is the 3rd project's description.",
	},
	{
		id: 5,
		linkAddress: "#",
		title: "Project 5",
		description: "This is the 3rd project's description.",
	},
];

export default async function Home() {
	return (
		<>
			<div className='h-screen font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
				<div className="w-full h-[90%]">
					<Navbar>{<></>}</Navbar>
					<div className="w-full h-full items-center justify-items-center mt-15">
						<main className="w-full h-full row-start-2 ">
							<div
								id="projects"
								className=" w-[85%] h-[260px] border-2 border-gray-400 bg-[#eaeaea] p-3 py-[8pt] rounded-[12px] mx-auto"
							>
								<div className="flex mt-auto">
									<ul className="flex w-[70%] min-w-[700px] m-auto">
										{projects.map((proj) => {
											const key: string = `li-${proj.title}`;
											return (
												<li
													key={key}
													className="m-auto"
												>
													<Project proj={proj} />
												</li>
											);
										})}
									</ul>
								</div>
								<div className="text-center -mt-[0.2rem]"></div>
							</div>
						</main>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
