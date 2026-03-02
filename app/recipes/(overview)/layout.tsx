import Navbar from "@/app/ui/navbar";
import Subbar from "@/app/ui/recipes/search/subbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar>{<></>}</Navbar>
			<Subbar />
			<div className="flex-grow p-6">{children}</div>
		</div>
	);
}
