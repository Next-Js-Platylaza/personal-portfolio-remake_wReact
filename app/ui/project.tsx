"use client";

import Link from "next/link";
import { ProjectStructure } from "../lib/definitions";
import { useState } from "react";
import StyleClasses from "../lib/style-classes";

export default function Project({ proj }: { proj: ProjectStructure }) {
	const [isActive, setIsActive] = useState(false);

	function onclick() {
		setIsActive((a) => (a = !a));
		console.log(isActive);
	}

	return (
		<button
			className="text-[#353535] cursor-pointer pl-4 border-[1px] border-[solid] border-[#00000011] rounded-[15px] m-[0.3rem] bg-[#f2eace]"
			onClick={onclick}
		>
			<Link
				key={proj.title}
				href={proj.linkAddress}
				className={StyleClasses.linkClass}
			>
				<h4 className="text-[#222233]">{proj.title}</h4>
			</Link>
			{isActive && (
				<p className="h-[100%] max-h-[100px]">{proj.description}</p>
			)}
		</button>
	);
}
