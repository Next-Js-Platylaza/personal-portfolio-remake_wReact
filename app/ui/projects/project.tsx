"use client";

import Link from "next/link";
import { Project } from "@/app/lib/definitions";
import Image from "next/image";

export default function ProjectComponent({ proj }: { proj: Project }) {
	return (
		<button className="w-50 h-50 p-0.15 text-[#353535] cursor-pointer border-4 border-[solid] border-[#00000055] rounded-[18px] bg-[#dedede]">
			<Link
				key={proj.title}
				href={
					proj.link.includes("http")
						? `${proj.link}`
						: `/projects/${proj.link}`
				}
				target={proj.link.includes("http") ? "_blank" : ""}
				rel="noopener noreferrer"
				className="flex flex-col items-center relative h-full w-full p-2 bg-gray-400 rounded-[13px]"
			>
    			<Image
    			    src={proj.img_src}
    			    alt="Project Background"
    			    fill
    			    className="object-cover opacity-50 rounded-[13px]"
    			/>
     			<div className="absolute inset-0 z-10 p-2 flex flex-col items-center justify-center text-black">
    			    <h4 className="text-[#0a0a0a] text-xl pt-2 mt-auto -mb-1">
						{proj.title}
					</h4>
					<p className="h-[100%] max-h-[100px] pt-2 m-auto text-center w-full">
						{proj.description}
					</p>
      			</div>	
			</Link>
		</button>
	);
}
