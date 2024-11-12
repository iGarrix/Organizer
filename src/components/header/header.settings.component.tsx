"use client"
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { GoWorkflow } from "react-icons/go"
import { CiBoxList, CiShoppingTag } from "react-icons/ci"
interface IHeaderSettingsProps {}

function HeaderSettings({}: IHeaderSettingsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="outline-none transition-all hover:-translate-y-[2px]"
				onClick={() => {
					console.log("gggg")
				}}
			>
				<IoSettingsOutline className="w-6 h-6 text-neutral-700 dark:text-neutral-500" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-light/80 shadow-xl backdrop-blur-xl border !mt-[0.9rem] !translate-x-[-33.3%] p-0 min-w-[18rem] dark:bg-dark-100 dark:border-light/20 dark:text-light">
				<DropdownMenuLabel className="pt-3 px-3 flex items-center justify-start border-b dark:border-b-light/20 mb-2">
					<p className="text-lg font-bold">Settings</p>
				</DropdownMenuLabel>
				<DropdownMenuItem className="dark:hover:bg-blue-400/20 dark:hover:text-pink-400 cursor-pointer">
					<GoWorkflow className="w-5 h-5" /> Workflow management
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HeaderSettings
