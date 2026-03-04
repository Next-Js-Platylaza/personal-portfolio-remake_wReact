import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";

import { Metadata } from "next";
import Projects from "../ui/projects";
import Link from "next/link";
import StyleClasses from "../lib/style-classes";
export const metadata: Metadata = {
	title: "Logan Blank's Portfolio Page",
};

export default async function Home() {
	const userId = await getCurrentUserId();
	return (
		<div className='h-screen font-["Open_Sans",_serif] font-[450] not-italic [font-variation-settings:"wdth"_100] bg-[#fff8dc]'>
			<Navbar>{<></>}</Navbar>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[74%]">
				<main className="flex flex-col gap-[16px] row-start-2 items-center">
					<h1>Home Page.</h1>
					<div>
						<header>
							<h1 className='font-["Playfair_Display",_serif] font-bold not-italic'>
								Logan Blank's Portfolio
							</h1>
						</header>
						<div>
							<div id="social">
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
							<div id="bio">
								<br />
								<img
									src="images/loganB.jpg"
									alt="portrait"
									width="250px"
									height="375px"
								/>
								<p>
									I'm 15, I like playing and making video
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
							<div
								id="projects"
								className="bg-[#f6eed2] pb-[0.1pt]"
							>
								<h1 className='font-["Playfair_Display",_serif] font-bold not-italic'>
									Projects
								</h1>
								<Projects />
							</div>

							<form id="contact" className="flex-[auto]">
								<label htmlFor="first-name">First Name</label>
								<input id="first-name" type="text" />

								<label htmlFor="last-name">Last Name</label>
								<input id="last-name" type="text" />

								<label htmlFor="email">Email</label>
								<input id="email" type="text" />

								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									placeholder="Type message here"
								></textarea>
								<select id="message-type">
									<option value="business">
										Business Inquiry
									</option>
									<option value="feedback">Feedback</option>
									<option value="general">
										General Question
									</option>
								</select>

								<button>Contact Me</button>
							</form>
						</div>

						<footer>
							<h4 className="text-[#222233]">
								&copy; Logan Blank 2024
							</h4>
						</footer>
					</div>
				</main>
			</div>
		</div>
	);
}
