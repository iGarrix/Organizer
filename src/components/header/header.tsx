"use client"
import { useStorage } from "@/api/storage/db.provider"
import src from "@/app/favicon.ico"
import { cn } from "@/lib/utils"
import { observer } from "mobx-react-lite"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ComponentPropsWithoutRef, useEffect, useState } from "react"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog"
import HeaderAccount from "./header.account.component"
import HeaderItem from "./header.item.component"
import HeaderNotifications from "./header.notifications.component"
import HeaderSettings from "./header.settings.component"
import { notificationService } from "@/api/notifications/notification.instance"
import { navHeader } from "./header.types"
import ThemeSwitch from "@/providers/theme/themeswitcher.component"

interface IHeaderProps extends Omit<ComponentPropsWithoutRef<"header">, "children"> {}

function Header({ className, ...props }: IHeaderProps) {
	const [isSetupAnother, setSetupAnother] = useState(false)
	const pathname = usePathname()
	const { clearStorage, workflow } = useStorage()
	const { notifications, haveNoReaded, load, clearAll, readableall } = notificationService
	const { push } = useRouter()

	useEffect(() => {
		if (!notifications || notifications.length === 0) {
			load()
		}
	}, [load, notifications])
	return (
		<header
			className={cn(
				"px-[15rem] h-[4rem] border-b backdrop-blur-xl sticky top-0 left-0 z-[100] flex items-center gap-5 overflow-hidden xs:hidden md:flex sm:px-5 2xl:px-[10rem] min-[1620px]:px-[15rem] dark:bg-dark-100 dark:border-b-light/20",
				className
			)}
			{...props}
		>
			<AlertDialog open={isSetupAnother} onOpenChange={setSetupAnother}>
				<AlertDialogContent className="!bg-white !text-black dark:!bg-dark-100 dark:!border-light/20">
					<AlertDialogHeader>
						<AlertDialogTitle className="dark:text-light/90">Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure that you want to set up another workspace instead of current?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="!bg-neutral-100 border-none hover:!bg-rose-500 dark:!bg-neutral-700 dark:text-light dark:hover:!bg-rose-500">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className="!bg-neutral-100 text-black hover:!bg-emerald-500 hover:!text-light dark:text-light dark:!bg-neutral-700 dark:hover:!bg-green-500/70"
							onClick={() => {
								setSetupAnother(false)
								push("/backup?transfer=new")
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<div className="flex items-center gap-2">
				<Image src={src} alt="icon" />
				<h1 className="font-borel font-black text-2xl tracking-wider dark:text-neutral-300">
					Organizer
				</h1>
			</div>
			<nav className="*:capitalize *:h-full *:flex *:items-center *:py-5 *:px-3 flex">
				{navHeader.map((item, i) => (
					<HeaderItem
						key={i}
						link={item.pathname}
						isSelected={
							item.type === "equal" ? pathname === item.pathname : pathname.includes(item.pathname)
						}
					>
						{item.title}
					</HeaderItem>
				))}
				<HeaderItem
					link={"/new-task"}
					isSelected={pathname.includes("/new-task")}
					className="border-l dark:border-l-light/20"
				>
					New task
				</HeaderItem>
			</nav>
			<div className="ml-auto flex items-center gap-4">
				<div className="transition-all hover:-translate-y-1">
					<ThemeSwitch />
				</div>
				<HeaderNotifications
					notifications={notifications}
					readableall={readableall}
					haveNoReaded={haveNoReaded}
					clearAll={clearAll}
				/>
				<HeaderSettings />
				{workflow && <HeaderAccount setSetupAnother={setSetupAnother} workflow={workflow} />}
			</div>
		</header>
	)
}

export default observer(Header)
