import { Metadata } from "next";
import { WPMCalculator } from "./wpm-calculator";
import Navbar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";
export const metadata: Metadata = {
	title: "Typing Speed Calculator | Logan Blank's Portfolio Page",
};

export default function Page() {
	return (
		<div className="bg-[#dddddd] min-h-full h-auto h-full mb-[-140pt] mt-0 mx-auto m-auto">
			<Navbar>{<></>}</Navbar>
			<div className="h-[155pt] m-auto"/>
			<div className="w-full h-[90%]">
					<div className="w-full h-full items-center justify-items-center mt-15">
						<h1 className="text-2xl mb-2">
							Typing speed calculator:
						</h1>
						<WPMCalculator />
					</div>
				</div>
			<div className="h-[236pt] m-auto"/>
			<Footer />
		</div>
	);
}

/*
		<div className="bg-[#dddddd] min-h-full h-auto h-full mb-[-140pt] mt-0 mx-auto m-auto">
			<Navbar>{<></>}</Navbar>
			<div className="h-[155pt] m-auto"/>
			<div className="w-full h-[90%]">
					<div className="w-full h-full items-center justify-items-center mt-15">
						<h1 className="text-2xl mb-2">
							Typing speed calculator:
						</h1>
						<WPMCalculator />
					</div>
				</div>
			<div className="h-[236pt] m-auto"/>
			<Footer />
		</div>
*/
