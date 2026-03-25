import Navbar from "@/app/ui/navbar";

import { Metadata } from "next";
import { fetchProject } from "@/app/lib/data";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home(props: {
	params: Promise<{ slug: string }>;
}) {
	const projectSlug = (await props.params).slug;

	const project = await fetchProject(projectSlug);

	return (
		<div className="h-screen font-[450] not-italic bg-[#dddddd]">
			<div className="w-full h-full">
				<Navbar>{<></>}</Navbar>
				<div className="w-full h-full items-center justify-items-center mt-15">
					<main className="w-full h-full row-start-2 ">
						<div className="flex flex-col flex-1 max-w-[900px] min-w-[400px] w-[55%] h-[75%] bg-gray-200 border-3 border-gray-400 rounded-[15px] p-2 m-auto">
							<h4 className="text-[#222233] text-xl mb-3">
								{project.title}
							</h4>
							<p className="h-[100%] max-h-[100px] m-auto text-center w-full">
								{project.description}
							</p>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
