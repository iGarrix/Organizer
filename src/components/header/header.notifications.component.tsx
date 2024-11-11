"use client"
import { IoNotificationsOutline } from "react-icons/io5"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { INotification, NotificationType } from "@/api/notifications/notifications.types"
import { IoIosInformationCircle, IoIosWarning } from "react-icons/io"
import { ScrollArea } from "../ui/scroll-area"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { MdOutlineNearbyError } from "react-icons/md"
interface IHeaderNotificationsProps {
	notifications: INotification[] | null
	haveNoReaded: boolean
	clearAll: () => void
	readableall: () => void
}

function HeaderNotifications({ ...props }: IHeaderNotificationsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="transition-all hover:-translate-y-1 outline-none select-none relative">
				{props.haveNoReaded && (
					<div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-0 right-0"></div>
				)}
				<IoNotificationsOutline className="w-6 h-6 text-neutral-700 dark:text-neutral-500" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-light/80 shadow-xl backdrop-blur-xl border !mt-[0.9rem] !translate-x-[-33.3%] p-0 w-[25rem] dark:bg-dark-100 dark:border-light/20">
				<DropdownMenuLabel className="pt-3 px-3 flex flex-col border-b dark:border-light/20">
					<p className="text-lg font-bold dark:text-light">Notifications</p>
					<br />
					<div className="flex justify-between text-sm font-normal">
						<div className="flex gap-2">
							<button
								className="transition-all hover:text-blue-500 dark:hover:text-pink-400 text-neutral-500 dark:text-light/50 leading-none"
								onClick={() => {
									props.readableall()
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
								props.clearAll()
							}}
						>
							Clear all
						</button>
					</div>
				</DropdownMenuLabel>
				<div className={"max-h-[25rem] overflow-y-auto pb-2"}>
					{props.notifications && props.notifications.length > 0 ? (
						<>
							{props.notifications
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
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HeaderNotifications
