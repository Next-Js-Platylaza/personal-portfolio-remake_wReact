import { Metadata } from "next";
import { WPMCalculator } from "./wpm-calculator";
import Navbar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";
export const metadata: Metadata = {
	title: "Typing Speed Calculator | Logan Blank's Portfolio Page",
};

export default function Page() {
	return (
		<>
			<div className="h-screen font-[450] not-italic bg-[#dddddd]">
				<div className="w-full h-[90%]">
					<Navbar>{<></>}</Navbar>
					<div className="w-full h-full items-center justify-items-center mt-15">
						<h1 className="text-2xl mb-2">
							Typing speed calculator:
						</h1>
						<WPMCalculator />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
