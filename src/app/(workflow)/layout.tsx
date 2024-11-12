import Header from "@/components/header/header"
import PhoneHeader from "@/components/header/phone-header"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Workflow",
	description: "Workflow",
}

export default function WorkflowLayout(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<main
			className="min-h-svh w-full text-sm flex flex-col bg-light dark:bg-dark-200"
			aria-hidden={false}
		>
			<Header />
			<br />
			<div className="grow grid px-[15rem] xs:px-0 sm:px-5 2xl:px-[10rem] min-[1620px]:px-[15rem]">
				{props.children}
			</div>
			<PhoneHeader />
			<Toaster />
		</main>
	)
}
