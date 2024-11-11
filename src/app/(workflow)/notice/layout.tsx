import type { Metadata } from "next"
import NavbarNotice from "./navbar"

export const metadata: Metadata = {
	title: "Notices",
}

export default function NoticeLayout(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="grid grid-cols-[20rem_1fr] gap-6">
			<NavbarNotice />
			{props.children}
		</div>
	)
}
