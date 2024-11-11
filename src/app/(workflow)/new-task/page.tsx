/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useStorage } from "@/api/storage/db.provider"
import DefButton from "@/components/common/buttons/defbutton/defbutton.component"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NewTaskSchema, NewTaskValues } from "@/forms/create-task-validation/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { observer } from "mobx-react-lite"
import { Controller, useForm } from "react-hook-form"
import { GoTag } from "react-icons/go"
import RichTextEditor from "@/components/common/fields/richtexteditor"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { IFieldState, ITag, ITask, TWorkflowField } from "@/api/storage/db.types"
import { useEffect, useState } from "react"
import { toJS } from "mobx"
import { toast } from "sonner"
import { RenderFieldValue } from "./components/render_field"
import { notificationService } from "@/api/notifications/notification.instance"
import { NotificationType } from "@/api/notifications/notifications.types"
import Tag from "@/components/common/tag/tag.component"
import { ChevronDown } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import GhostButton from "@/components/common/buttons/ghostbutton/ghostbutton.component"

function NewTaskPage() {
	const {
		workflow,
		tasks,
		task_drafts: drafts,
		createTask,
		createDraft,
		clearDrafts,
	} = useStorage()
	const { notify } = notificationService
	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<NewTaskValues>({
		defaultValues: {
			title: "",
			htmlContent: "",
			tags: workflow?.tags.find(f => f.index === "Star")
				? [workflow?.tags.find(f => f.index === "Star")]
				: [],
			asDraft: false,
		},
		resolver: zodResolver(NewTaskSchema),
	})

	const [gStr, setGStr] = useState("")
	const wTags = watch("tags", [])
	const [taskField, setTaskField] = useState<TWorkflowField[]>([])
	const { push, refresh } = useRouter()

	const onSubmit = (values: NewTaskValues) => {
		const task: ITask = {
			title: values.title,
			htmlContent: values.htmlContent,
			fields: taskField,
			tags: values.tags.length !== 0 ? (values.tags as ITag[]) : [],
			createdAt: new Date(),
		}
		if (values.asDraft) {
			createDraft(task)
			reset({
				title: "",
				htmlContent: "",
				asDraft: false,
				tags: values.tags,
			})
			toast.info("A new draft saved successfully")
			return
		}
		createTask(task)
		notify({
			title: task.title,
			content: `Task created successfully. Tagged as ${task.tags?.map(f => f.index).join(", ")}`,
			createdAt: new Date(),
			type: NotificationType.Info,
		})
		toast.info("Task created successfully")

		push(`/task/${workflow?.id}-${tasks.length + 1}`)
	}

	const getDraftResolver = (draft: ITask) => {
		const state = draft.fields.find(f => f.fieldType === "state")
		if (state) {
			const v = state.value as IFieldState
			if (v) {
				return v.states[v.selectedIndex].isResolved
			}
		}
		return false
	}

	const onSelectDraft = (draft: ITask) => {
		const JSDraft = toJS(draft)
		reset({
			title: JSDraft.title,
			htmlContent: JSDraft.htmlContent,
			tags: JSDraft.tags,
			asDraft: false,
		})
		setTaskField(JSDraft.fields)
	}

	const resetDraft = () => {
		refresh()
	}

	useEffect(() => {
		if (taskField.length === 0) {
			const constants = workflow?.globalFields
			if (constants) {
				setTaskField(toJS(constants))
			}
		}
	}, [taskField, workflow?.globalFields])
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<div className="grid grid-cols-[1fr_22rem] gap-x-4">
				<div className="flex flex-col relative">
					<div className="sticky top-[4rem] bg-light dark:bg-dark-200 pb-2 z-50">
						<br />
						<div className="grid grid-cols-[1fr_auto_16px] items-center gap-2">
							<input
								type="text"
								{...register("title")}
								placeholder="Summary"
								className="bg-transparent text-2xl font-bold border-b-2 focus:border-b-blue-500 outline-0 w-full dark:border-b-light/20 dark:focus:border-b-blue-400"
							/>
							<DropdownMenu>
								<DropdownMenuTrigger
									className="flex items-center justify-center gap-1 transition-all text-blue-500 outline-none hover:text-pink-500 dark:text-blue-400 dark:hover:text-pink-400"
									disabled={drafts.length === 0}
								>
									<span>
										{drafts.length} draft{drafts.length === 1 && "s"}
									</span>
									<ChevronDown className="w-3 h-3" />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-light rounded p-0 min-w-[20rem] select-none text-sm dark:bg-dark-100 dark:border-light/20">
									{drafts.map((f, i) => (
										<DropdownMenuItem
											key={i}
											className="grid grid-cols-[auto_1fr_auto] gap-2 px-2 py-1 cursor-pointer hover:!bg-transparent [&>p]:hover:!text-pink-500"
											onClick={() => {
												onSelectDraft(f)
											}}
										>
											<p className="text-blue-500 uppercase transition-all font-semibold dark:text-blue-400">
												{f.id}
											</p>
											<span className="text-neutral-500 line-clamp-1 dark:text-neutral-400">
												{f.title}
											</span>
											<div
												className={cn(
													"flex items-center justify-center px-1 rounded",
													getDraftResolver(f)
														? "bg-gradient-to-br from-pink-500 to-amber-500"
														: "bg-gradient-to-br from-accent-blue to-accent-green"
												)}
											>
												<span className="uppercase font-bold text-white">
													{getDraftResolver(f) ? "DONE" : "UNDONE"}
												</span>
											</div>
										</DropdownMenuItem>
									))}
									{drafts.length > 0 && (
										<>
											<hr className="dark:border-light/20" />
											<div className="flex gap-2 items-center">
												<DropdownMenuItem
													className="text-blue-500 !bg-transparent hover:!text-blue-600 py-2 px-2 cursor-pointer dark:!bg-transparent dark:text-blue-400 dark:hover:!text-pink-400"
													onClick={() => {
														clearDrafts()
													}}
												>
													Clear all
												</DropdownMenuItem>
												<DropdownMenuItem
													className="text-blue-500 !bg-transparent hover:!text-blue-600 py-2 px-2 cursor-pointer dark:!bg-transparent dark:text-blue-400 dark:hover:!text-pink-400"
													onClick={resetDraft}
												>
													Clear draft
												</DropdownMenuItem>
											</div>
										</>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
							<Popover>
								<PopoverTrigger>
									<GoTag className="w-4 h-4" />
								</PopoverTrigger>
								<PopoverContent className="bg-light rounded p-0 py-2 select-none dark:bg-dark-100 dark:border-light/20">
									<ul className="*:grid *:grid-cols-[1fr_24px] *:py-1.5 *:items-center *:px-4">
										<Controller
											name="tags"
											control={control}
											render={({ field }) => (
												<>
													{workflow?.tags.map((f, i) => (
														<li
															key={i}
															className="transition-all hover:bg-blue-500/10 cursor-pointer dark:hover:bg-blue-400/20 dark:text-light"
															onClick={() => {
																if (!field.value.map(f => f.index).includes(f.index)) {
																	field.onChange([...field.value, f])
																}
															}}
														>
															<p className="text-sm">{f.index}</p>
															<span
																className="w-6 h-6 flex items-center justify-center text-center leading-none rounded-sm text-white uppercase"
																style={{ backgroundColor: f.color }}
															>
																{f.index[0]}
															</span>
														</li>
													))}
													<hr className="!pt-0 dark:border-light/20" />
													<li
														className="transition-all text-blue-500 hover:text-blue-600 cursor-pointer dark:text-blue-400 dark:hover:text-pink-400"
														onClick={() => {
															push("/tags")
														}}
													>
														<p className="text-sm">Add a new tag</p>
													</li>
												</>
											)}
										/>
									</ul>
								</PopoverContent>
							</Popover>
						</div>
						<div className="flex gap-2 flex-wrap mt-2 min-h-[1.5rem]">
							<AnimatePresence>
								{wTags.map((f, i) => (
									<Tag
										key={i}
										value={f}
										onDelete={() => {
											const nw = getValues("tags")
											setValue("tags", [...nw.filter(nwi => nwi.index !== f.index)])
										}}
									/>
								))}
							</AnimatePresence>
						</div>
					</div>
					<div>
						<RichTextEditor
							initialValue={getValues("htmlContent")}
							setValue={setValue}
							isClear={isSubmitSuccessful}
						/>
					</div>
					<br />
					<div className="flex gap-2 pb-[10rem]">
						<DefButton type="submit" className="bg-sky-500 text-white hover:bg-sky-600">
							Create task
						</DefButton>
						<DefButton
							type="submit"
							className="bg-green-500 text-white hover:bg-green-600"
							onClick={() => {
								setValue("asDraft", true)
							}}
						>
							Save Draft
						</DefButton>
						<GhostButton
							type="button"
							onClick={() => {
								push("/")
							}}
						>
							Cancel
						</GhostButton>
					</div>
				</div>
				<div className="relative">
					<div className="bg-neutral-200/70 border rounded py-3 flex flex-col sticky top-[5rem] dark:bg-dark-100 dark:border-light/20">
						<ul className="*:grid *:grid-cols-[1fr_1.5fr] *:px-4">
							{taskField.map((f, i) => (
								<li
									key={i}
									className="transition-all hover:bg-blue-400/20 cursor-pointer items-center"
								>
									<p className="text-neutral-500 text-[15px]">{f.fieldName}</p>
									<RenderFieldValue
										gStr={gStr}
										props={f}
										setGStr={setGStr}
										setTaskField={setTaskField}
										push={push}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</form>
	)
}

export default observer(NewTaskPage)
