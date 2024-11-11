"use client"

import DefButton from "@/components/common/buttons/defbutton/defbutton.component"
import { Link } from "@/components/common/link/link"
import { Progress } from "@/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { MdFilterNone, MdOutlineImportExport } from "react-icons/md"
import ScratchSetupWay from "./scratchway/scratchway"

export type IProgressType = {
	progress: number
	way: "none" | "import" | "scratch"
	message: string
}

export default function SetupPage() {
	const [progresPage, setProgresPage] = useState<IProgressType>({
		progress: 0,
		way: "none",
		message: "Select way of set up",
	})

	function importSettings() {
		setProgresPage({
			progress: 100,
			way: "import",
			message: "Configurations imported successfully",
		})
	}
	function startFromScratch() {
		setProgresPage({
			progress: 25,
			way: "scratch",
			message: "Workflow identity",
		})
	}

	return (
		<div className="w-svw h-svh overflow-x-hidden grid grid-rows-[25svh_1fr] gap-5 pb-[3rem] relative bg-light">
			<div className="flex items-center justify-center gap-5 sticky top-0 left-0 bg-light z-10 px-[2rem]">
				<h2 className="font-bold text-3xl text-transparent bg-gradient-to-br from-accent-blue to-accent-green bg-clip-text text-center min-w-[20rem]">
					{progresPage.message}
					<div className="text-sm mt-2">
						<span>{progresPage.progress}%</span>
						<Progress
							max={100}
							value={progresPage.progress}
							className="border-none mt-2 rounded-sm h-[2px] min-w-[20rem]"
						/>
					</div>
				</h2>
			</div>
			<div className="flex flex-col items-center justify-start bg-light">
				<AnimatePresence>
					{progresPage.progress === 0 && (
						<motion.div
							initial={{ y: "10svh", opacity: 0, scale: 0.8 }}
							animate={{
								y: 0,
								opacity: 1,
								scale: 1,
							}}
							exit={{
								y: "-5svh",
								opacity: 0,
								scale: 0.8,
								transition: { duration: 0.2 },
							}}
							className="grid gap-3 min-w-[20rem]"
						>
							<DefButton
								className="py-5 grid grid-cols-[1fr_2fr] items-center justify-start"
								onClick={importSettings}
							>
								<MdOutlineImportExport className="w-7 h-7" />
								<p className="text-start">Import from file</p>
							</DefButton>
							<div className="flex items-center gap-2 xs:hidden md:flex">
								<hr className="grow" />
								<span>OR</span>
								<hr className="grow" />
							</div>
							<DefButton
								type="button"
								className="py-5 grid grid-cols-[1fr_2fr] items-center justify-start xs:hidden md:grid"
								onClick={startFromScratch}
							>
								<MdFilterNone className="w-5 h-5" />
								<p className="text-start">Start from scratch</p>
							</DefButton>
						</motion.div>
					)}
				</AnimatePresence>
				{progresPage.way === "scratch" && (
					<ScratchSetupWay setProgresPage={setProgresPage} progresPage={progresPage} />
				)}
				<AnimatePresence>
					{progresPage.progress === 100 && (
						<motion.div
							initial={{ y: "10svh", opacity: 0, scale: 0.8 }}
							animate={{
								y: 0,
								opacity: 1,
								scale: 1,
								transition: { delay: 0.2 },
							}}
							exit={{
								y: "-5svh",
								opacity: 0,
								scale: 0.8,
								transition: { duration: 0.2 },
							}}
							className="grid gap-3 min-w-[20rem]"
						>
							<h1 className="font-borel text-2xl font-extrabold tracking-widest text-center">
								Gettings started
							</h1>
							<p className="text-center">
								from{" "}
								<Link href={"/"} className="text-blue-600">
									create
								</Link>{" "}
								a first task
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
