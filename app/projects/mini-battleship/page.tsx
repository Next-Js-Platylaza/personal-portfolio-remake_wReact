import Footer from "@/app/ui/footer";
import BattleshipPage from "./battleship";
import Navbar from "@/app/ui/navbar";

import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Mini-Battleship | Logan Blank's Portfolio Page",
};

export default function Page() {
	return (
		<div className=" bg-red-200">
			<Navbar>{<></>}</Navbar>
			<BattleshipPage footer={<Footer/>}/>
		</div>
	);
}
