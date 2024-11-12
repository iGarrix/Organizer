/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IFieldEnum,
	IFieldMultiEnum,
	IFieldPeriod,
	IFieldState,
	TWorkflowField,
} from "@/api/storage/db.types"
import { Calendar } from "@/components/ui/calendar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Check, ChevronDown } from "lucide-react"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Dispatch, SetStateAction } from "react"
import { FaRegCheckCircle } from "react-icons/fa"

export interface IProps {
	props: TWorkflowField
	gStr: string
	setGStr: Dispatch<SetStateAction<string>>
	push: (href: string, options?: NavigateOptions) => void
	setTaskField: Dispatch<SetStateAction<TWorkflowField[]>>
}

export const RenderFieldValue = ({ props, push, gStr, setGStr, setTaskField }: IProps) => {
	const { fieldType, value } = props

	const actor = <T extends IFieldState | IFieldEnum>(f: TWorkflowField[], i: number) => {
		const ind = f.findIndex(f => f.fieldName === props.fieldName)
		;(f[ind].value as T).selectedIndex = i
		return [...f]
	}

	switch (fieldType) {
		case "date":
			const date = value as Date
			return (
				<Popover>
					<PopoverTrigger>
						<p
							className={cn(
								"text-start py-2",
								!date ? "text-neutral-400" : "text-blue-500 dark:text-pink-400"
							)}
						>
							{!date ? "?" : format(date, "dd.MM.yyyy")}
						</p>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto p-0 dark:bg-dark-100 dark:text-white dark:border-light/20"
						align="start"
					>
						<Calendar
							mode="single"
							selected={date || new Date()}
							onSelect={(e: any) => {
								setTaskField(f => {
									const ind = f.findIndex(f => f.fieldName === props.fieldName)
									;(f[ind].value as Date) = e as Date
									return [...f]
								})
							}}
							disabled={(date: Date) => {
								const now = new Date()
								now.setDate(now.getDate() - 1)
								return date <= now
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			)
		case "string":
			const vstring = value as string
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="text-blue-500 dark:text-pink-400 outline-none py-2 text-start">
						{vstring ? <p>{vstring}</p> : <p className=" text-neutral-400">?</p>}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-3 px-4 *:rounded-none *:cursor-pointer min-w-[13rem] flex flex-col gap-1 dark:bg-dark-100 dark:border-light/20">
						<input
							className="border !rounded text-sm outline-none focus:border-blue-400 py-1 px-1.5 dark:border-light/20 dark:focus:border-blue-400 dark:text-white/80"
							defaultValue={vstring}
							placeholder="Enter something..."
							onChange={e => {
								setGStr(e.target.value)
							}}
						></input>
						<div className="flex gap-2 items-center text-sm">
							<DropdownMenuItem
								className="p-0 !bg-transparent"
								onClick={() => {
									console.log(gStr)
									setTaskField(f => {
										const ind = f.findIndex(f => f.fieldName === props.fieldName)
										;(f[ind].value as string) = gStr
										return [...f]
									})
									setGStr("")
								}}
							>
								<button
									type="submit"
									className="text-blue-400 transition-all hover:text-blue-600 dark:hover:text-pink-400"
								>
									Apply
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0 !bg-transparent">
								<button
									type="button"
									className="text-neutral-600 dark:text-neutral-400 dark:hover:text-red-400 transition-all hover:text-red-400"
								>
									Cancel
								</button>
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		case "list":
			const vList = value as IFieldEnum
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="text-blue-500 dark:text-pink-400 outline-none py-2 text-start relative *:data-[state=open]:rotate-180 *:transition-all">
						<span>{vList.options[vList.selectedIndex] || vList.options[0]}</span>
						<ChevronDown className="absolute w-4 h-4 text-neutral-400 right-0 top-[50%] translate-y-[-50%]" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="px-0 *:rounded-none *:cursor-pointer min-w-[13rem] dark:bg-dark-100 dark:border-light/20">
						{vList.options.map((f, i) => (
							<DropdownMenuItem
								key={i}
								className="hover:!bg-blue-500/20 dark:hover:!bg-blue-400/20 dark:text-light"
								onClick={() => {
									setTaskField(act => actor(act, i))
								}}
							>
								<span
									className={`${i === vList.selectedIndex && "text-blue-500 dark:text-blue-400"} `}
								>
									{f}
								</span>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator className="dark:bg-light/20" />
						<DropdownMenuItem
							className="text-sm text-blue-400 hover:!text-pink-400 transition-all hover:!bg-transparent"
							onClick={() => {
								push("/fields")
							}}
						>
							Add new value...
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		case "multi-list":
			const vMultiList = value as IFieldMultiEnum
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="text-blue-500 dark:text-pink-400 outline-none py-2 text-start relative *:data-[state=open]:rotate-180 *:transition-all">
						<span className={cn(vMultiList.selectedOptions.length === 0 && "text-neutral-400")}>
							{vMultiList.selectedOptions.map(f => vMultiList.options[f]).join(", ") || "?"}
						</span>
						<ChevronDown className="absolute w-4 h-4 text-neutral-400 right-0 top-[50%] translate-y-[-50%]" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="px-0 *:rounded-none *:cursor-pointer min-w-[13rem] select-none dark:bg-dark-100 dark:border-light/20">
						{vMultiList.options.map((f, i) => (
							<li
								key={i}
								className="hover:!bg-blue-500/20 py-2 text-sm px-2 flex items-center justify-between dark:text-light"
								onClick={() => {
									setTaskField(act => {
										const ind = act.findIndex(act => act.fieldName === props.fieldName)
										const sOpts = (act[ind].value as IFieldMultiEnum).selectedOptions
										if (!sOpts.includes(i)) {
											;(act[ind].value as IFieldMultiEnum).selectedOptions = [...sOpts, i]
										} else {
											;(act[ind].value as IFieldMultiEnum).selectedOptions = sOpts.filter(
												f => f !== i
											)
										}
										return [...act]
									})
								}}
							>
								<span
									className={`${
										vMultiList.selectedOptions.includes(i) && "text-blue-500 dark:text-blue-400"
									} `}
								>
									{f}
								</span>
								<Check
									className={cn(
										"w-4 h-4",
										vMultiList.selectedOptions.includes(i)
											? "text-blue-500 dark:text-blue-400"
											: "text-gray-500 dark:text-gray-400"
									)}
								/>
							</li>
						))}
						<DropdownMenuSeparator className="dark:bg-light/20" />
						<DropdownMenuItem
							className="text-sm text-blue-400 hover:!text-blue-500 dark:hover:!text-pink-400 transition-all hover:!bg-transparent"
							onClick={() => {
								push("/fields")
							}}
						>
							Add new value...
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		case "period":
			const vperiod = value as IFieldPeriod
			const regexValid =
				/^(?:(\d+mo)|(\d+w)|(\d+d)|(\d+h)|(\d+m))(?:\s+(?:(\d+mo)|(\d+w)|(\d+d)|(\d+h)|(\d+m)))*$/
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="text-blue-500 dark:text-pink-400 outline-none py-2 text-start">
						{vperiod ? vperiod.spent : <span className="!text-neutral-400">?</span>}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-3 px-4 *:rounded-none *:cursor-pointer min-w-[13rem] flex flex-col gap-1 dark:bg-dark-100 dark:border-light/20">
						<input
							className={cn(
								"border !rounded text-sm outline-none py-1 px-1.5 active:border-blue-500 focus-within:border-blue-500 dark:border-light/20 dark:text-light dark:active:border-blue-400 dark:focus-within:border-blue-400"
							)}
							defaultValue={""}
							onChange={e => {
								setGStr(e.target.value)
							}}
							placeholder="1mo 1w 1d 1h 1m"
						></input>
						<div className="flex gap-2 items-center text-sm">
							<DropdownMenuItem
								className="p-0 !bg-transparent"
								onClick={() => {
									setTaskField(f => {
										const ind = f.findIndex(f => f.fieldName === props.fieldName)
										;(f[ind].value as IFieldPeriod | null) = regexValid.test(gStr)
											? { spent: gStr }
											: null
										return [...f]
									})
									setGStr("")
								}}
							>
								<button
									type="submit"
									className="text-blue-400 transition-all hover:text-blue-600 dark:hover:text-pink-400"
								>
									Apply
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0 !bg-transparent">
								<button
									type="button"
									className="text-neutral-600 dark:text-neutral-400 transition-all hover:text-red-400 dark:hover:text-red-400"
								>
									Cancel
								</button>
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		case "state":
			const vState = value as IFieldState
			const selectedState = vState.states[vState.selectedIndex] || vState.states[0]
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="grid grid-cols-[1fr_20px] outline-none py-2">
						<span className="text-blue-500 dark:text-pink-400 text-start">
							{selectedState.index}
						</span>
						<div
							className={cn(
								"flex items-center justify-center w-[20px] h-[20px] rounded",
								selectedState.isResolved
									? "bg-gradient-to-br from-pink-500 to-amber-500"
									: "bg-gradient-to-br from-accent-blue to-accent-green"
							)}
						>
							<span className="uppercase font-bold text-white">{selectedState.index[0]}</span>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="px-0 *:rounded-none *:cursor-pointer min-w-[13rem] dark:bg-dark-100 dark:border-light/20 dark:text-light">
						{vState.states.map((f, i) => (
							<DropdownMenuItem
								key={i}
								className="hover:!bg-blue-500/20 dark:hover:!bg-blue-400/20 dark:text-light"
								onClick={() => {
									setTaskField(act => actor(act, i))
								}}
							>
								<span
									className={`${
										f.index === selectedState.index && "text-blue-500 dark:text-blue-400"
									} `}
								>
									{f.index}
								</span>
								{f.isResolved && (
									<FaRegCheckCircle className="text-green-500 dark:text-green-400 ml-auto" />
								)}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator className="dark:bg-light/20" />
						<DropdownMenuItem
							className="text-sm text-blue-400 hover:!text-blue-500 dark:hover:!text-pink-400 transition-all hover:!bg-transparent"
							onClick={() => {
								push("/fields")
							}}
						>
							Add new value...
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)

		default:
			return <>?</>
	}
}
