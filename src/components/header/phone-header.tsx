"use client"

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer"
import { IoAddCircleOutline, IoNotificationsOutline } from "react-icons/io5"
import { CiStickyNote, CiViewList } from "react-icons/ci"
import { useStorage } from "@/api/storage/db.provider"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Link } from "../common/link/link"
import ThemeSwitch from "@/providers/theme/themeswitcher.component"
import { GoWorkflow } from "react-icons/go"
import { LuDatabaseBackup } from "react-icons/lu"
import { BsCloudUpload } from "react-icons/bs"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import PhoneHeaderNotificationsComponent from "./phone-header.notifications.component"
import { notificationService } from "@/api/notifications/notification.instance"
import { toJS } from "mobx"

interface IPhoneHeaderProps {}

function PhoneHeader({ ...props }: IPhoneHeaderProps) {
	const { clearStorage, workflow } = useStorage()
	const [isOpen, setOpen] = useState(false)
	const { haveNoReaded, notifications, readableall, clearAll } = notificationService
	const pathname = usePathname()
	const [notificationOpen, setNotificationOpen] = useState(false)
	const { push } = useRouter()

	return (
		<header className="grid grid-cols-4 px-2 fixed bottom-0 left-0 w-full border-t bg-light dark:bg-dark-200 dark:border-t-light/20 xs:grid md:hidden pb-5">
			<Link
				href={"/"}
				className={cn(
					"py-3 flex justify-center items-center text-neutral-500 dark:text-neutral-400",
					pathname === "/" && "!text-blue-500 dark:!text-pink-400"
				)}
			>
				<CiViewList className="w-7 h-7" />
			</Link>
			<Link
				href={"/notice"}
				className={cn(
					"py-3 flex justify-center items-center text-neutral-500 dark:text-neutral-400",
					pathname.includes("/notice") && "!text-blue-500 dark:!text-pink-400"
				)}
			>
				<CiStickyNote className="w-7 h-7" />
			</Link>
			<Link
				href={"/new-task"}
				className={cn(
					"py-3 flex justify-center items-center text-neutral-500 dark:text-neutral-400",
					pathname.includes("/new-task") && "!text-blue-500 dark:!text-pink-400"
				)}
			>
				<IoAddCircleOutline className="w-7 h-7" />
			</Link>
			<PhoneHeaderNotificationsComponent
				notifications={notifications}
				open={notificationOpen}
				onOpenChange={setNotificationOpen}
				readableall={readableall}
				clearAll={clearAll}
			/>
			<Drawer open={isOpen} onOpenChange={setOpen}>
				<DrawerTrigger className="py-3 flex justify-center items-center">
					<div className="bg-gradient-to-br from-accent-blue to-accent-green dark:from-pink-600 dark:to-pink-400 rounded-lg w-7 h-7 flex items-center justify-center transition-all">
						<span className="text-white font-bold leading-none tracking-wider text-center uppercase text-sm">
							ct
						</span>
					</div>
				</DrawerTrigger>
				<DrawerContent className="dark:bg-dark-200 dark:border-light/20">
					<DrawerHeader>
						<DrawerTitle className="flex flex-col items-center gap-2">
							<span className="text-blue-400 uppercase tracking-wider font-semibold">
								{workflow?.id}
							</span>{" "}
							<span className="text-neutral-400 text-sm font-[400]">{workflow?.name}</span>
						</DrawerTitle>
						<DrawerDescription></DrawerDescription>
					</DrawerHeader>
					<div className="grid gap-2 px-[1rem]">
						<button
							className="dark:text-neutral-200 grid gap-2 items-center grid-cols-[30px_1fr] text-start"
							onClick={() => {
								setOpen(false)
							}}
						>
							<GoWorkflow className="w-5 h-5" />
							Workflow management
						</button>
						<button
							className="dark:text-neutral-200 grid gap-2 items-center grid-cols-[30px_1fr] text-start"
							onClick={() => {
								setOpen(false)
								push("/backup")
							}}
						>
							<LuDatabaseBackup className="w-5 h-5" />
							Backup
						</button>
						<button
							className="text-red-500 dark:text-red-400 grid gap-2 items-center grid-cols-[30px_1fr] text-start"
							onClick={() => {
								setOpen(false)
								push("/backup?transfer=new")
							}}
						>
							<BsCloudUpload className="w-5 h-5" />
							Set up another one
						</button>
					</div>
					<br />
					<div className="flex justify-center gap-3 items-center">
						<div className="transition-all hover:-translate-y-1">
							<ThemeSwitch />
						</div>
						<button
							className="transition-all hover:-translate-y-1 outline-none select-none relative"
							onClick={() => {
								setOpen(false)
								setNotificationOpen(true)
							}}
						>
							{haveNoReaded && (
								<div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-0 right-0"></div>
							)}
							<IoNotificationsOutline className="w-6 h-6 text-neutral-700 dark:text-neutral-500" />
						</button>
					</div>
					<DrawerFooter className="mb-5"></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</header>
	)
}

export default observer(PhoneHeader)
