"use client"
import { ComponentPropsWithoutRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
	IFieldEnum,
	IFieldMultiEnum,
	IFieldPeriod,
	IFieldState,
	ITask,
	TWorkflowField,
} from "@/api/storage/db.types"
import { ChevronDown } from "lucide-react"
import "@/components/common/fields/richtexteditor/stylizer.scss"
import { AnimatePresence, motion } from "framer-motion"
import Tag from "../../tag/tag.component"
import { format } from "date-fns"
import { FaStar } from "react-icons/fa"
interface ITaskCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
	workflowId: string
	cardSize: "minimal" | "medium"
	task: Omit<ITask, "htmlContent">
	htmlContent?: string
	isSelected?: boolean
	selectIdle?: boolean
	onSelectTask?: (_sel: boolean) => void
	onRedirect: () => void
}

function TaskCard({
	className,
	cardSize,
	workflowId,
	task,
	htmlContent,
	onRedirect,
	isSelected,
	selectIdle,
	onSelectTask,
	...props
}: ITaskCardProps) {
	const [isOpenCode, setOpenCode] = useState(false)
	const resolvedValue = task.fields.find(f => f.fieldType === "state")?.value as IFieldState
	if (!task) {
		return <>unknows task</>
	}

	const renderCode = () => {
		return (
			<AnimatePresence>
				{htmlContent && isOpenCode && (
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0 }}
						className="tiptap border mt-2 overflow-hidden bg-gray-100 dark:bg-dark-100 dark:border-light/20 dark:text-neutral-200"
					>
						<div className="p-3" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
					</motion.div>
				)}
			</AnimatePresence>
		)
	}
	const renderIcon = () => {
		if (selectIdle) {
			return (
				<input
					type="checkbox"
					checked={isSelected}
					className="w-4 h-4"
					onChange={e => {
						onSelectTask?.(e.target.checked)
					}}
				/>
			)
		}
		const state = task.fields.find(f => f.fieldType === "state")
		if (state) {
			const _v = state.value as IFieldState
			if (_v.states[_v.selectedIndex].isResolved) {
				return (
					<div className="w-5 h-5 uppercase flex items-center justify-center leading-none font-semibold bg-gradient-to-br from-pink-500 to-amber-500 text-white rounded">
						{_v.states[_v.selectedIndex].index[0]}
					</div>
				)
			} else {
				return (
					<div className="w-5 h-5 uppercase flex items-center justify-center leading-none font-semibold bg-gradient-to-br from-accent-blue to-accent-green text-white rounded">
						{_v.states[_v.selectedIndex].index[0]}
					</div>
				)
			}
		}
		return (
			<div className="w-5 h-5 uppercase flex items-center justify-center leading-none font-semibold bg-blue-500 text-white rounded">
				{task.title[0]}
			</div>
		)
	}

	const renderCodeArrow = () => {
		return (
			<button
				type="button"
				className="w-full hover:text-blue-500 dark:hover:text-pink-400 dark:text-neutral-500"
				onClick={() => {
					setOpenCode(!isOpenCode)
				}}
			>
				<ChevronDown className={cn("w-4 h-4 transition-all", isOpenCode && "rotate-180")} />
			</button>
		)
	}

	const renderFieldValue = (field: TWorkflowField) => {
		let returnValue = null
		let isResolve = null
		if (field.fieldType === "date") {
			const date = field.value as Date
			returnValue = format(new Date(date), "dd.MM")
		}
		if (field.fieldType === "list") {
			const slist = field.value as IFieldEnum
			returnValue = slist.options[slist.selectedIndex]
		}
		if (field.fieldType === "multi-list") {
			const ml = field.value as IFieldMultiEnum
			returnValue = `${ml.options[ml.selectedOptions[0]]}...`
		}
		if (field.fieldType === "period") {
			const period = field.value as IFieldPeriod
			returnValue = period?.spent
		}
		if (field.fieldType === "state") {
			const state = field.value as IFieldState
			isResolve = state.states[state.selectedIndex].isResolved
			returnValue = state.states[state.selectedIndex].index
		}
		if (field.fieldType === "string") {
			const str = field.value as string
			returnValue = str
		}
		return (
			returnValue && (
				<>
					{isResolve != null && (
						<div
							className={cn(
								"flex h-1 rounded-t w-full  absolute bottom-[-8px] translate-x-[-8px]",
								!isResolve
									? "bg-gradient-to-r from-accent-blue to-accent-green"
									: "bg-gradient-to-r from-amber-500 to-pink-500"
							)}
						></div>
					)}
					<div
						className={cn(
							isResolve != null && (!isResolve ? "text-accent-blue" : "text-amber-500")
						)}
					>
						{returnValue}
					</div>
				</>
			)
		)
	}
	console.log(task.tags?.map(f => f.index).includes("Star"))
	if (cardSize === "minimal") {
		return (
			<div className="flex flex-col relative">
				{task.tags?.map(f => f.index).includes("Star") && (
					<FaStar className="absolute top-[11px] left-[-20px] w-4 h-4 text-amber-500" />
				)}
				<div
					className={cn(
						className,
						"py-2 transition-all duration-75 rounded overflow-hidden grid grid-cols-[20px_1fr_30px] items-center gap-3 pl-2 xs:items-start md:items-center",
						isSelected ? "bg-blue-500/10" : "hover:bg-blue-500/20"
					)}
					{...props}
				>
					{renderIcon()}
					<div className="flex line-clamp-1 gap-2">
						<div
							className={cn(
								"items-center gap-4 grid grid-cols-[auto_1fr] xs:grid-cols-[auto_1fr_auto] xs:gap-1 md:grid-cols-[auto_1fr] md:gap-4 xs:w-full md:w-auto"
							)}
							onClick={onRedirect}
						>
							<span
								className={cn(
									"uppercase font-semibold mr-2",
									resolvedValue.states[resolvedValue.selectedIndex].isResolved &&
										"text-gray-500 line-through"
								)}
							>
								{task.id}
							</span>
							<span
								className={cn(
									"cursor-pointer line-clamp-1 text-pretty xs:line-clamp-3 md:line-clamp-1 md:col-start-2",
									resolvedValue.states[resolvedValue.selectedIndex].isResolved
										? "text-gray-500"
										: "text-blue-500 transition-all hover:text-pink-500 dark:text-blue-400 dark:hover:text-pink-400"
								)}
							>
								{task.title}
							</span>
							<span
								className={cn(
									"uppercase font-semibold text-neutral-400 text-end w-full xs:block md:hidden"
								)}
							>
								{format(new Date(task.createdAt), "dd/MM")}
							</span>
						</div>
						<div className="flex items-center gap-1 xs:hidden md:flex">
							{task.tags
								?.filter(f => f.index !== "Star")
								.map((f, i) => (
									<Tag key={i} value={f} disabled />
								))}
						</div>
					</div>
					{renderCodeArrow()}
				</div>
				{renderCode()}
			</div>
		)
	} else if (cardSize === "medium") {
		return (
			<div>
				<div
					className={cn(
						"flex flex-col border-b transition-all duration-75 relative group/card dark:border-b-light/20",
						isSelected ? "bg-blue-500/10" : "hover:bg-blue-500/20"
					)}
				>
					{task.tags?.map(f => f.index).includes("Star") && (
						<FaStar className="absolute top-[10px] left-[-20px] w-4 h-4 text-amber-500 z-10" />
					)}
					<div
						className={cn(
							className,
							"py-2 transition-all duration-75 rounded items-center overflow-hidden grid grid-cols-[20px_1fr_30px] gap-3 pl-2 xs:items-start md:items-center"
						)}
						{...props}
					>
						{renderIcon()}
						<div className="flex line-clamp-1 gap-2 min-h-6">
							<div
								className={cn(
									"items-center gap-4 grid grid-cols-[auto_1fr] xs:grid-cols-[1fr_auto] xs:gap-1 md:grid-cols-[auto_1fr] md:gap-4 xs:w-full md:w-auto"
								)}
								onClick={onRedirect}
							>
								<span
									className={cn(
										"uppercase font-semibold dark:text-neutral-200",
										resolvedValue.states[resolvedValue.selectedIndex].isResolved &&
											"text-gray-500 line-through dark:text-gray-500"
									)}
								>
									{task.id}
								</span>
								<span
									className={cn(
										"uppercase font-semibold text-neutral-400 text-end w-full xs:block md:hidden"
									)}
								>
									{format(new Date(task.createdAt), "dd/MM")}
								</span>
								<span
									className={cn(
										" cursor-pointer line-clamp-1 text-pretty xs:line-clamp-3 xs:row-start-2 md:line-clamp-1 md:row-start-1 md:col-start-2",
										resolvedValue.states[resolvedValue.selectedIndex].isResolved
											? "text-gray-500 dark:text-neutral-400"
											: "text-blue-500 transition-all dark:text-blue-400 hover:text-pink-500 dark:hover:text-pink-400"
									)}
								>
									{task.title}
								</span>
							</div>
							<div className="flex items-center gap-1 xs:hidden md:flex">
								{task.tags
									?.filter(f => f.index !== "Star")
									.map((f, i) => (
										<Tag key={i} value={f} disabled />
									))}
							</div>
						</div>
						{renderCodeArrow()}
					</div>
					<div className="flex flex-wrap justify-start gap-2 divide-x pl-[32px] pb-2 line-clamp-1 overflow-hidden dark:divide-light/20 xs:flex md:hidden">
						{task.tags
							?.filter(f => f.index !== "Star")
							.map((f, i) => (
								<Tag key={i} value={f} disabled />
							))}
					</div>
					<div className="flex justify-start gap-3 divide-x pl-[32px] pb-2 line-clamp-1 overflow-hidden dark:divide-light/20 xs:hidden md:flex">
						{task.fields
							.filter(f => f.value)
							.map((f, i) => (
								<div
									key={i}
									className="px-2 text-sm text-gray-500 dark:text-neutral-400 line-clamp-1 relative whitespace-nowrap"
								>
									{renderFieldValue(f)}
								</div>
							))}
					</div>
				</div>
				{renderCode()}
			</div>
		)
	}

	return <div className={cn(className)} {...props}></div>
}

export default TaskCard
