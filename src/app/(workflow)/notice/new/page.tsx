"use client"

import { articleService } from "@/api/articles/articles.instance"
import { IArticle } from "@/api/articles/articles.types"
import { notificationService } from "@/api/notifications/notification.instance"
import { NotificationType } from "@/api/notifications/notifications.types"
import { useStorage } from "@/api/storage/db.provider"
import { ITag } from "@/api/storage/db.types"
import DefButton from "@/components/common/buttons/defbutton/defbutton.component"
import GhostButton from "@/components/common/buttons/ghostbutton/ghostbutton.component"
import RichTextEditor from "@/components/common/fields/richtexteditor"
import Tag from "@/components/common/tag/tag.component"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NewArticleSchema, NewArticleValues } from "@/forms/create-article-validation/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { GoTag } from "react-icons/go"
import { toast } from "sonner"

function NewNoticePage() {
	const {
		article_drafts: drafts,
		articles,
		createArticle,
		createDraft,
		clearDrafts,
	} = articleService
	const { workflow } = useStorage()
	const { notify } = notificationService
	const { push, refresh } = useRouter()

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<NewArticleValues>({
		defaultValues: {
			title: "",
			htmlContent: "",
			tags: [],
			asDraft: false,
		},
		resolver: zodResolver(NewArticleSchema),
	})
	const wTags = watch("tags", [])

	const onSubmit = (values: NewArticleValues) => {
		const article: IArticle = {
			title: values.title,
			htmlContent: values.htmlContent,
			tags: values.tags.length !== 0 ? (values.tags as ITag[]) : [],
			createdAt: new Date(),
		}

		if (values.asDraft) {
			createDraft(article)
			reset({
				title: "",
				htmlContent: "",
				asDraft: false,
				tags: values.tags,
			})
			toast.info("A new draft saved successfully")
			return
		}
		if (workflow) {
			createArticle(article, workflow.id)
			notify({
				title: article.title,
				content: `Article created successfully. Tagged as ${article.tags
					?.map(f => f.index)
					.join(", ")}`,
				createdAt: new Date(),
				type: NotificationType.Info,
			})
			toast.info("Article created successfully")
			push(`/notice/${workflow?.id.toUpperCase()}-A-${articles.length + 1}`)
		}
	}
	const onSelectDraft = (draft: IArticle) => {
		const JSDraft = toJS(draft)
		reset({
			title: JSDraft.title,
			htmlContent: JSDraft.htmlContent,
			tags: JSDraft.tags,
			asDraft: false,
		})
	}

	useEffect(() => {
		if (wTags.length === 0) {
			const tag = workflow?.tags.find(f => f.index === "Star")
			if (tag) {
				setValue("tags", [tag])
			}
		}
	}, [])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col xs:px-2 lg:px-0">
			<div className="grid gap-x-4">
				<div className="flex flex-col relative">
					<div className="sticky top-[5rem] xs:top-0 lg:top-[5rem] pb-2 z-50 bg-light dark:bg-dark-200">
						<br className="xs:block lg:hidden" />
						<div className="grid grid-cols-[1fr_auto_16px] items-center gap-2">
							<input
								type="text"
								{...register("title")}
								placeholder="Summary"
								className="bg-transparent text-2xl font-bold border-b-2 focus:border-b-blue-500 outline-0 w-full dark:bg-dark-200 dark:border-b-light/20 dark:focus:border-b-blue-400"
							/>
							<DropdownMenu>
								<DropdownMenuTrigger
									className="flex items-center justify-center gap-1 transition-all text-blue-500 outline-none dark:text-blue-400 hover:text-pink-500"
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
											className="grid grid-cols-[auto_1fr] gap-2 px-2 py-1 cursor-pointer hover:!bg-transparent [&>p]:hover:!text-pink-500"
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
										</DropdownMenuItem>
									))}
									{drafts.length > 0 && (
										<>
											<hr className="dark:border-light/20" />
											<div className="flex gap-2 items-center">
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
														onClick={refresh}
													>
														Clear draft
													</DropdownMenuItem>
												</div>
											</div>
										</>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
							<Popover>
								<PopoverTrigger>
									<GoTag className="w-4 h-4" />
								</PopoverTrigger>
								<PopoverContent className="bg-light rounded p-0 py-2 select-none dark:border-light/20 dark:bg-dark-100">
									<ul className="*:grid *:grid-cols-[1fr_24px] *:py-1.5 *:items-center *:px-4">
										<Controller
											name="tags"
											control={control}
											render={({ field }) => (
												<>
													{workflow &&
														toJS(workflow?.tags).map((f, i) => (
															<li
																key={i}
																className="transition-all hover:bg-blue-500/10 dark:hover:bg-blue-400/10 cursor-pointer"
																onClick={() => {
																	if (!field.value.map(f => f.index).includes(f.index)) {
																		field.onChange([...field.value, f])
																	}
																}}
															>
																<p className="text-sm dark:text-light">{f.index}</p>
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
					<div className="flex gap-2 pb-[10rem] xs:flex-col sm:flex-row">
						<DefButton type="submit" className="bg-sky-500 text-white hover:bg-sky-6000">
							Create article
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
							className="bg-transparent border-2 border-neutral-200 hover:border-neutral-300"
							onClick={() => {
								push("/notice")
							}}
						>
							Cancel
						</GhostButton>
					</div>
				</div>
			</div>
		</form>
	)
}

export default observer(NewNoticePage)
