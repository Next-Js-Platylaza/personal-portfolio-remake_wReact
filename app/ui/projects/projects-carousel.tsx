"use client";

import { Ref, useRef, useState, Suspense } from "react";
import { Project } from "@/app/lib/definitions";
import StyleClasses from "@/app/lib/style-classes";
import ProjectComponent from "./project";
import Link from "next/link";

export default function ProjectsCarousel({
	projects,
}: {
	projects: Project[];
}) {
	const [value, setValue] = useState(2);
	const mainDivRef: Ref<HTMLDivElement> | null = useRef(null);

	function onClick(forward: boolean) {
		if (forward) {
			if (value >= projects.length) setValue(1);
			else setValue((v) => v + 1);
		} else if (value <= 1) setValue(projects.length);
		else setValue((v) => v - 1);
	}

	let fallbackProject = (
		<div className="m-auto">
			<div className="w-50 h-50 p-0.15 text-[#353535] cursor-pointer border-4 border-[solid] border-[#00000055] rounded-[18px] bg-[#dedede]" />
		</div>
	);

	function getProjectsToDisplay() {
		let idToSet = 0;
		let ids: number[] = [];

		function addProject(value: number) {
			ids[idToSet] = value;
			idToSet++;
		}

		if (value == 1) addProject(projects.length);

		for (let i = 1; i <= projects.length; i++)
			if (i >= value - 1 && i <= value + 1) {
				addProject(i);
			}

		if (value == projects.length) addProject(1);

		let projectsToReturn: Project[] = [];
		for (let i = 0; i < ids.length; i++)
			projectsToReturn[i] = projects[ids[i] - 1];

		return projectsToReturn;
	}

	return (
		<div
			ref={mainDivRef}
			id="projects"
			className="w-[85%] min-w-[280px] h-[250px] border-2 border-gray-400 bg-[#eaeaea] p-3 py-[8pt] rounded-[12px] mx-auto"
		>
			<div className="flex mt-auto">
				<button
					className={`${StyleClasses.buttonClass} w-16 h-16 font-bold text-5xl -mr-10 m-auto`}
					onClick={() => {
						onClick(false);
					}}
				>
					<p className="-ml-2 -mt-1">&larr;</p>
				</button>
				<ul className="flex w-[70%] min-w-[700px] m-auto">
					<Suspense
						fallback={
							<>
								{fallbackProject}
								{fallbackProject}
								{fallbackProject}
							</>
						}
					>
						{getProjectsToDisplay().map((proj) => {
							const key: string = `li-${proj.title}`;
							return (
								<li key={key} className="m-auto">
									<ProjectComponent proj={proj} />
								</li>
							);
						})}
					</Suspense>
				</ul>
				<button
					className={`${StyleClasses.buttonClass} w-16 h-16 font-bold text-5xl -ml-10 m-auto`}
					onClick={() => {
						onClick(true);
					}}
				>
					<p className="-ml-2 -mt-1">&rarr;</p>
				</button>
			</div>
			<div className="text-center mt-[0.3rem]">
				<Link href="/projects" className={StyleClasses.linkClass}>
					See All
				</Link>
			</div>
		</div>
	);
}
