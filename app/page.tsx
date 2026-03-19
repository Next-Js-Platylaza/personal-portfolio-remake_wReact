import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";

import { Metadata } from "next";
import ProjectsCarousel from "@/app/ui/projects/projects-carousel";
import Link from "next/link";
import StyleClasses from "@/app/lib/style-classes";
import ArticlesSection from "@/app/ui/articles/articles-section";
import Footer from "./ui/footer";
import { fetchProjects } from "./lib/data";
import ContactForm from "./ui/contact-form";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home() {
	const userId = await getCurrentUserId();
	const projects = await fetchProjects();

	return (
		<>
			<div className='h-full font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
				<Navbar>{<></>}</Navbar>
				<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[74%]">
					<main className="flex flex-col gap-[16px] row-start-2 items-center">
						<div>
							<header>
								<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-3xl text-center w-[1200px] my-1'>
									- Logan Blank's Portfolio -
								</h1>
							</header>
							<div>
								<div id="bio">
									<br />
									<div className="flex">
										<img
											src="images/loganB.jpg"
											alt="portrait"
											width="250px"
											height="375px"
											className="border-3 border-gray-300 rounded-[40pt]"
										/>
										<div
											id="social"
											className="pl-3 pb-5 mt-auto"
										>
											<Link
												href="https://www.linkedin.com/in/logan-blank-68896b342/"
												className={
													StyleClasses.linkClass
												}
											>
												LinkedIn
											</Link>
											<br />
											<Link
												href="https://github.com/Platylaza"
												className={
													StyleClasses.linkClass
												}
											>
												Github
											</Link>
										</div>
									</div>

									<p className="pt-4 pb-6">
										I'm 17, I like playing and making video
										games. I was first introduced to HTML
										around 2016, by my sister.
										<br />
										She showed me how to make a little
										webpage that included colored headers,
										images, and a background image.
										<br />
										I installed the Unity game-engine in
										June of 2023. Since then I've used
										c-sharp to create and work on
										<br />
										several games. In August of 2023 I took
										an introductory web-development class at
										Sky View High School
										<br />
										and learned a lot more about HTML and
										css. That class also covered the basics
										of Adobe Photoshop.
									</p>
								</div>
								<br />
								<hr className="py-4 w-[60%] m-auto" />
								<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-2xl text-center mb-5'>
									- My Projects -
								</h1>

								<ProjectsCarousel projects={projects} />

								<br />
								<br />
								<hr className="py-5 w-[75%] m-auto" />
								<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-2xl text-center mb-5'>
									- My Articles -
								</h1>
								<ArticlesSection />
							</div>
							<br />
							<br />
							<hr className="py-5 w-[60%] m-auto" />
							<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-2xl text-center mb-5'>
								- Contact Me -
							</h1>
							<ContactForm />
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}
