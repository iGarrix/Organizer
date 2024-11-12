import type { Metadata } from "next"
import NavbarNotice from "./navbar"

export const metadata: Metadata = {
	title: "Notices",
}

export default function NoticeLayout(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="grid grid-cols-[20rem_1fr] gap-6 xs:grid-cols-1 xs:grid-rows-[auto_1fr] xs:px-2 lg:px-0 lg:grid-cols-[20rem_1fr] lg:grid-rows-1 relative">
			<div className="sticky top-0 xs:static xs:pb-[10rem] xs:row-start-2 lg:sticky lg:pb-0 lg:row-start-1">
				<NavbarNotice />
			</div>
			{props.children}
		</div>
	)
}
