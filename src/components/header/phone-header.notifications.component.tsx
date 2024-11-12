"use client"
import { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import { observer } from "mobx-react-lite"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "../ui/drawer"
import { INotification, NotificationType } from "@/api/notifications/notifications.types"
import { IoIosInformationCircle, IoIosWarning } from "react-icons/io"
import { format } from "date-fns"
import { MdOutlineNearbyError } from "react-icons/md"
import { toJS } from "mobx"
interface IPhoneNotificationsProps {
	notifications: INotification[] | null
	open: boolean
	onOpenChange: (open: boolean) => void
	readableall: () => void
	clearAll: () => void
}

function PhoneNotifications({
	open,
	onOpenChange,
	readableall,
	clearAll,
	...props
}: IPhoneNotificationsProps) {
	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="dark:bg-dark-200 dark:border-light/20">
				<DrawerHeader>
					<DrawerTitle className="flex flex-col items-center gap-2">Notifications</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className="flex justify-between text-sm font-normal px-2">
					<div className="flex gap-2">
						<button
							className="transition-all hover:text-blue-500 dark:hover:text-pink-400 text-neutral-500 dark:text-light/50 leading-none"
							onClick={() => {
								readableall()
							}}
						>
							All
						</button>
						{/* <button className="transition-all hover:text-blue-500 dark:hover:text-pink-400 text-neutral-500 dark:text-light/50 leading-none">
								Info
							</button>
							<button className="transition-all hover:text-blue-500 dark:hover:text-pink-400 text-neutral-500 dark:text-light/50 leading-none">
								Warn
							</button>
							<button className="transition-all hover:text-blue-500 dark:hover:text-pink-400 text-neutral-500 dark:text-light/50 leading-none">
								Errors
							</button> */}
					</div>
					<button
						className="transition-all hover:text-blue-500 text-neutral-500 dark:text-neutral-400 leading-none"
						onClick={() => {
							clearAll()
						}}
					>
						Clear all
					</button>
				</div>
				<br />
				<div className={"max-h-[70svh] overflow-y-auto pb-2"}>
					{props.notifications && props.notifications.length > 0 ? (
						<>
							{toJS(props.notifications)
								.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
								.map((f, i) => (
									<div key={i} className={cn("pt-2 flex flex-col text-sm bg-gradient-to-b")}>
										<div className="flex flex-col gap-1 px-3 text-slate-600 dark:text-neutral-400">
											<div className="flex justify-between items-start gap-3">
												<h2
													className={cn(
														"font-semibold text-base text-slate-600 line-clamp-1",
														f.type === NotificationType.Info
															? "text-blue-500 dark:text-blue-400"
															: f.type === NotificationType.Warn
															? "text-amber-500 dark:text-amber-400"
															: "text-red-500 dark:text-red-400"
													)}
												>
													{f.title}
												</h2>
												<p className="text-sm text-neutral-500 dark:text-neutral-400">
													{format(f.createdAt, "dd/MM")}
												</p>
											</div>
											{f?.content}
										</div>
										<div className="grid grid-cols-[1fr_16px_1fr] items-center z-10">
											<hr
												className={cn(
													"w-full",
													f.type === NotificationType.Info
														? "border-blue-500 dark:border-blue-400"
														: f.type === NotificationType.Warn
														? "border-amber-500 dark:border-amber-400"
														: "border-red-500 dark:border-red-400"
												)}
											/>
											{f.type === NotificationType.Info ? (
												<IoIosInformationCircle className="w-4 h-4 grow text-blue-600 dark:text-blue-500" />
											) : f.type === NotificationType.Warn ? (
												<IoIosWarning className="w-4 h-4 grow text-amber-500 dark:text-amber-400" />
											) : (
												<MdOutlineNearbyError className="w-4 h-4 grow text-red-500 dark:text-red-400" />
											)}

											<hr
												className={cn(
													"w-full",
													f.type === NotificationType.Info
														? "border-blue-500 dark:border-blue-400"
														: f.type === NotificationType.Warn
														? "border-amber-500 dark:border-amber-400"
														: "border-red-500 dark:border-red-400"
												)}
											/>
										</div>
									</div>
								))}
						</>
					) : (
						<div className="flex items-center justify-center py-6 text-sm text-neutral-400 dark:text-neutral-300">
							Inbox empty
						</div>
					)}
				</div>
				<DrawerFooter className="mb-5"></DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default PhoneNotifications
