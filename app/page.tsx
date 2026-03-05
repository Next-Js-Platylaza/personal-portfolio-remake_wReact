import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";

import { Metadata } from "next";
import ProjectsCarousel from "@/app/ui/projects-carousel";
import Link from "next/link";
import StyleClasses from "@/app/lib/style-classes";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home() {
	const userId = await getCurrentUserId();
	return (
		<div className='h-full font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#dddddd]'>
			<Navbar>{<></>}</Navbar>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[74%]">
				<main className="flex flex-col gap-[16px] row-start-2 items-center">
					<div>
						<header>
							<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-3xl text-center my-1'>
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
											className={StyleClasses.linkClass}
										>
											LinkedIn
										</Link>
										<br />
										<Link
											href="https://github.com/Platylaza"
											className={StyleClasses.linkClass}
										>
											Github
										</Link>
									</div>
								</div>

								<p className="pt-4 pb-6">
									I'm 17, I like playing and making video
									games. I was first introduced to HTML around
									2016, by my sister.
									<br />
									She showed me how to make a little webpage
									that included colored headers, images, and a
									background image.
									<br />
									I installed the Unity game-engine in June of
									2023. Since then I've used c-sharp to create
									and work on
									<br />
									several games. In August of 2023 I took an
									introductory web-development class at Sky
									View High School
									<br />
									and learned a lot more about HTML and css.
									That class also covered the basics of Adobe
									Photoshop.
								</p>
							</div>
							<hr className="py-3 w-[65%] m-auto" />
							<h1 className='font-["Playfair_Display",_serif] font-bold not-italic text-2xl text-center mb-5'>
								- My Projects -
							</h1>

							<ProjectsCarousel />

							<form
								id="contact"
								className="flex-[auto] bg-red-200"
							>
								<label htmlFor="first-name">First Name</label>
								<input
									id="first-name"
									type="text"
									className={StyleClasses.inputFormClass}
								/>

								<label htmlFor="last-name">Last Name</label>
								<input
									id="last-name"
									type="text"
									className={StyleClasses.inputFormClass}
								/>

								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="text"
									className={StyleClasses.inputFormClass}
								/>

								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									placeholder="Type message here"
									className={StyleClasses.inputFormClass}
								></textarea>
								<select
									id="message-type"
									className={StyleClasses.inputFormClass}
								>
									<option value="business">
										Business Inquiry
									</option>
									<option value="feedback">Feedback</option>
									<option value="general">
										General Question
									</option>
								</select>

								<button className={StyleClasses.buttonClass}>
									Contact Me
								</button>
							</form>
						</div>

						<footer>
							<h4 className="text-[#222233]">
								&copy; Logan Blank 2026
							</h4>
						</footer>
					</div>
				</main>
			</div>
		</div>
	);
}
