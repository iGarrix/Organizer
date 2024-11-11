import { MobxStorageProtector } from "@/api/storage/db.protector"
import Header from "@/components/header/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Workflow",
	description: "Workflow",
}

export default function WorkflowLayout(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<MobxStorageProtector>
			<main className="min-h-svh w-full text-sm flex flex-col bg-light dark:bg-dark-200">
				<Header />
				<br />
				<div className="grow grid px-[15rem] xs:px-2 sm:px-5 2xl:px-[10rem] min-[1620px]:px-[15rem]">
					{props.children}
				</div>
			</main>
		</MobxStorageProtector>
	)
}
