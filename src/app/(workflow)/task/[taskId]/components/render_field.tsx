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
import { Check } from "lucide-react"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Dispatch, SetStateAction } from "react"
import { FaRegCheckCircle } from "react-icons/fa"

export interface IProps {
	props: TWorkflowField
	gStr: string
	setGStr: Dispatch<SetStateAction<string>>
	push: (href: string, options?: NavigateOptions) => void
	setTaskField: Dispatch<SetStateAction<TWorkflowField[]>>
	onChange?: () => void
}

export const RenderFieldValue = ({
	props,
	push,
	gStr,
	setGStr,
	setTaskField,
	...iprops
}: IProps) => {
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
					<PopoverTrigger className="transition-all hover:bg-blue-400/20 cursor-pointer w-full outline-none">
						<div className="flex flex-col items-start">
							<p className="text-neutral-500 text-[15px]">{props.fieldName}</p>
							<p
								className={cn(
									"text-start",
									!date ? "text-neutral-400" : "text-blue-500 dark:text-pink-400"
								)}
							>
								{!date ? "?" : format(date, "dd.MM.yyyy")}
							</p>
						</div>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto p-0 dark:bg-dark-100 dark:border-light/20 dark:text-light"
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
								iprops.onChange?.()
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
					<DropdownMenuTrigger className="transition-all hover:bg-blue-400/20 cursor-pointer w-full outline-none">
						<div className="flex flex-col items-start">
							<p className="text-neutral-500 text-[15px]">{props.fieldName}</p>
							<div className="text-blue-500 text-start w-full dark:text-pink-400">
								{vstring ? <p>{vstring}</p> : <p className="!text-neutral-400">?</p>}
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-3 px-4 *:rounded-none *:cursor-pointer min-w-[22rem] flex flex-col gap-1 dark:bg-dark-100 dark:border-light/20">
						<input
							className="border !rounded text-sm outline-none focus:border-blue-400 py-1 px-1.5 dark:border-light/20 dark:focus:boder-blue-400 dark:text-light"
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
									setTaskField(f => {
										const ind = f.findIndex(f => f.fieldName === props.fieldName)
										;(f[ind].value as string) = gStr
										return [...f]
									})
									setGStr("")
									iprops.onChange?.()
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
									className="text-neutral-600 transition-all hover:text-red-400"
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
					<DropdownMenuTrigger className="transition-all hover:bg-blue-400/20 cursor-pointer w-full outline-none">
						<div className="flex flex-col items-start">
							<p className="text-neutral-500 text-[15px]">{props.fieldName}</p>
							<div className="text-blue-500 text-start w-full dark:text-pink-400">
								<span>{vList.options[vList.selectedIndex] || vList.options[0]}</span>
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="px-0 *:rounded-none *:cursor-pointer min-w-[22rem] dark:bg-dark-100 dark:border-light/20">
						{vList.options.map((f, i) => (
							<DropdownMenuItem
								key={i}
								className="hover:!bg-blue-500/20 dark:hover:!bg-blue-400/20 dark:text-light"
								onClick={() => {
									setTaskField(act => actor(act, i))
									iprops.onChange?.()
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
							className="text-sm text-blue-400 hover:!text-blue-500 transition-all hover:!bg-transparent dark:hover:!text-pink-400"
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
					<DropdownMenuTrigger className="transition-all hover:bg-blue-400/20 cursor-pointer w-full outline-none">
						<div className="flex flex-col items-start">
							<p className="text-neutral-500 text-[15px]">{props.fieldName}</p>
							<div className="text-blue-500 text-start w-full dark:text-pink-400">
								<span className={cn(vMultiList.selectedOptions.length === 0 && "text-neutral-400")}>
									{vMultiList.selectedOptions.map(f => vMultiList.options[f]).join(", ") || "?"}
								</span>
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="px-0 *:rounded-none *:cursor-pointer min-w-[22rem] dark:bg-dark-100 dark:border-light/20">
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
									iprops.onChange?.()
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
											? "text-blue-500"
											: "text-gray-500 dark:text-light"
									)}
								/>
							</li>
						))}
						<DropdownMenuSeparator className="dark:bg-light/20" />
						<DropdownMenuItem
							className="text-sm text-blue-400 hover:!text-blue-500 transition-all hover:!bg-transparent dark:hover:!text-pink-400"
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
					<DropdownMenuTrigger className="transition-all hover:bg-blue-400/20 cursor-pointer w-full outline-none grid grid-cols-[1fr_20px]">
						<div className="flex flex-col items-start">
							<p className="text-neutral-500 text-[15px]">{props.fieldName}</p>
							<span className="text-blue-500 text-start dark:text-pink-400">
								{vperiod ? vperiod.spent : <span className="!text-neutral-400">?</span>}
							</span>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-3 px-4 *:rounded-none *:cursor-pointer min-w-[22rem] flex flex-col gap-1 dark:bg-dark-100 dark:border-light/20">
						<input
							className={cn(
								"border !rounded text-sm outline-none py-1 px-1.5 active:border-blue-500 focus-within:border-blue-500 dark:border-light/20 dark:text-light dark:focus-within:border-blue-400"
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
									iprops.onChange?.()
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
									className="text-neutral-600 transition-all hover:text-red-400 dark:hover:text-red-400"
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
					<DropdownMenuTrigger className="transition-all hover:bg-blue-400/20 cursor-pointer w-full outline-none grid grid-cols-[1fr_20px]">
						<div className="flex flex-col items-start">
							<p className="text-neutral-500 text-[15px]">{props.fieldName}</p>
							<span className="text-blue-500 text-start dark:text-pink-400">
								{selectedState.index}
							</span>
						</div>
						<div
							className={cn(
								"flex items-center justify-center my-auto w-[20px] h-[20px] rounded",
								selectedState.isResolved
									? "bg-gradient-to-br from-pink-500 to-amber-500"
									: "bg-gradient-to-br from-accent-blue to-accent-green"
							)}
						>
							<span className="uppercase font-bold text-white">{selectedState.index[0]}</span>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="px-0 *:rounded-none *:cursor-pointer min-w-[22rem] dark:bg-dark-100 dark:border-light/20">
						{vState.states.map((f, i) => (
							<DropdownMenuItem
								key={i}
								className="hover:!bg-blue-500/20 dark:text-light"
								onClick={() => {
									setTaskField(act => actor(act, i))
									iprops.onChange?.()
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
									<FaRegCheckCircle className="text-green-500 ml-auto dark:text-green-400" />
								)}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator className="dark:bg-light/20" />
						<DropdownMenuItem
							className="text-sm text-blue-400 hover:!text-blue-500 transition-all hover:!bg-transparent dark:hover:!text-pink-400"
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
