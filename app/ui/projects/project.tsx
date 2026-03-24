"use client";

import Link from "next/link";
import { Project } from "@/app/lib/definitions";

export default function ProjectComponent({ proj }: { proj: Project }) {
	return (
		<button className="w-50 h-50 text-[#353535] cursor-pointer border-[2px] border-[solid] border-[#00000055] rounded-[18px] bg-[#dedede]">
			<Link
				key={proj.title}
				href={`projects/${proj.slug}`}
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
