import Navbar from "@/app/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar>{<></>}</Navbar>
			<div className="flex-grow p-6">{children}</div>
		</div>
	);
}
