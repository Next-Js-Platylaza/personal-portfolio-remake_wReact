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
			className="w-50 h-50 text-[#353535] cursor-pointer border-[2px] border-[solid] border-[#00000055] rounded-[18px] m-[0.5rem] bg-[#dedede]"
			onClick={onclick}
		>
			<Link
				key={proj.title}
				href={proj.linkAddress}
				className="flex flex-col items-center "
			>
				<h4
					className="text-[#222233] text-xl
				mb-3"
				>
					{proj.title}
				</h4>
				<p className="h-[100%] max-h-[100px] m-auto text-center w-full">
					{proj.description}
				</p>
			</Link>
		</button>
	);
}
