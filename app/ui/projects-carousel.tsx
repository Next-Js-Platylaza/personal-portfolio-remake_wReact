"use client";

import { useState } from "react";
import { ProjectStructure } from "../lib/definitions";
import StyleClasses from "../lib/style-classes";
import Project from "./project";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
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

export default function ProjectsCarousel() {
	const [value, setValue] = useState(1);

	function onClick(forward: boolean) {
		if (forward) {
			if (value >= projects.length) setValue(1);
			else setValue((v) => v + 1);
		} else if (value <= 1) setValue(projects.length);
		else setValue((v) => v - 1);
	}

	function getProjectsToDisplay() {
		let idToSet = 0;
		let ids: number[] = [];
		console.log("Value = " + value);

		if (value == 1) {
			ids[idToSet] = projects.length - 1;
			idToSet++;
		}
		for (let i = 1; i <= projects.length; i++)
			if (i >= value - 1 || i <= value + 1) {
				ids[idToSet] = i;
				idToSet++;
				console.log(i);
			}

		if (value == projects.length) {
			ids[idToSet] = 1;
			idToSet++;
		}

		let carouselIndex = 0;
		let projectsToReturn: ProjectStructure[] = [];
		ids.forEach((id) => {
			projectsToReturn[carouselIndex] = projects[id - 1];
			carouselIndex++;
		});
		return projectsToReturn;
	}

	return (
		<div
			id="projects"
			className="flex w-[85%] border-2 border-gray-400 bg-[#eaeaea] p-3 py-[8pt] rounded-[12px] mx-auto"
		>
			<button
				className={`${StyleClasses.buttonClass} w-16 h-16 font-bold text-5xl -mr-10 m-auto`}
				onClick={() => {
					onClick(false);
				}}
			>
				<p className="-ml-2 -mt-1">&larr;</p>
			</button>
			<ul className="flex w-[70%] min-w-[700px] m-auto">
				{getProjectsToDisplay().map((proj) => {
					if (proj.id < value - 1 || proj.id > value + 1) return;

					const key: string = `li-${proj.title}`;
					return (
						<li key={key} className="m-auto">
							<Project proj={proj} />
						</li>
					);
				})}
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
	);
}
