import Navbar from "@/app/ui/navbar";

import { Metadata } from "next";
import { fetchProjects } from "@/app/lib/data";
import Footer from "@/app/ui/footer";
import ProjectComponent from "@/app/ui/projects/project";
import { Project } from "@/app/lib/definitions";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home() {
	const projects: Project[] = await fetchProjects();

	return (
		<>
			<div className="h-screen font-[450] not-italic bg-[#dddddd]">
				<div className="w-full h-[90%]">
					<Navbar>{<></>}</Navbar>
					<div className="w-full h-full items-center justify-items-center mt-15">
						<main className="w-full h-full row-start-2 ">
							<div
								id="projects"
								className="flex flex-wrap gap-2.5 w-[85%] min-w-[450px] h-[260px] border-2 border-gray-400 bg-[#eaeaea] p-[8pt] rounded-[12px] mx-auto min-xl:min-w-[1100px] max-lg:h-[450px] max-md:h-[600px]"
							>
								{projects.map((proj) => {
									const key: string = `li-${proj.title}`;
									return (
										<div key={key} className="m-auto">
											<ProjectComponent
												key={key}
												proj={proj}
											/>
										</div>
									);
								})}
							</div>
						</main>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
