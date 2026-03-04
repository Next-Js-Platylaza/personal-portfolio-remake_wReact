import { ProjectStructure } from "../lib/definitions";
import Project from "./project";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const projects: ProjectStructure[] = [
	{
		linkAddress: "#",
		title: "Project 1",
		description: "This is the 1st project's description.",
	},
	{
		linkAddress: "#",
		title: "Project 2",
		description: "This is the 2nd project's description.",
	},
	{
		linkAddress: "#",
		title: "Project 3",
		description: "This is the 3rd project's description.",
	},
];

export default function Projects() {
	return (
		<ul>
			{projects.map((proj) => {
				const key: string = `li-${proj.title}`;
				return (
					<li key={key}>
						<Project proj={proj} />
					</li>
				);
			})}
		</ul>
	);
}
