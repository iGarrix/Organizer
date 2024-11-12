"use client"

import { articleService } from "@/api/articles/articles.instance"
import { IArticle } from "@/api/articles/articles.types"
import { useStorage } from "@/api/storage/db.provider"
import { IFieldState, ITag } from "@/api/storage/db.types"
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
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDistance } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { toJS, values } from "mobx"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FiEdit2 } from "react-icons/fi"
import { GoTag } from "react-icons/go"
import { IoCloseCircleOutline, IoCopy } from "react-icons/io5"
import { SlOptions } from "react-icons/sl"
import { toast } from "sonner"

function ArticlePage(props: { params: { article: string } }) {
	const { workflow } = useStorage()
	const { articles, editArticle, deleteArticle } = articleService
	const [currentArticle, setCurrentArticle] = useState<IArticle | null>(null)
	const [isEdit, setEdit] = useState(false)
	const { push } = useRouter()

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
			htmlContent: "",
			tags: workflow?.tags.find(f => f.index === "Star")
				? [workflow?.tags.find(f => f.index === "Star")]
				: [],
			asDraft: false,
		},
		resolver: zodResolver(NewArticleSchema),
	})
	const wTags = watch("tags", [])
	const onSubmit = (values: NewArticleValues) => {
		if (currentArticle) {
			const article: IArticle = {
				id: props.params.article.toUpperCase(),
				title: values.title,
				htmlContent: values.htmlContent,
				tags: values.tags.length !== 0 ? (values.tags as ITag[]) : [],
				createdAt: currentArticle?.createdAt,
			}
			console.log(article)
			try {
				editArticle(article)
				setEdit(false)
				setCurrentArticle(article)
			} catch (error) {
				const _err = error as string
				toast.error(_err)
			}
		}
	}

	const handleDeleteTask = () => {
		try {
			deleteArticle(props.params.article.toUpperCase())
			push("/")
			toast.info("Article has been deleted")
		} catch (error) {
			const err = error as string
			toast.error(`Article hasn't been deleted, ${err}`)
		}
	}

	useEffect(() => {
		if (!currentArticle) {
			const findArticle = articles.find(
				(f, i) => f.id?.toUpperCase() === props.params.article.toUpperCase()
			)
			if (findArticle) {
				const jsArticle = toJS(findArticle)
				setCurrentArticle(jsArticle)
				reset({
					title: jsArticle.title,
					htmlContent: jsArticle.htmlContent,
					tags: jsArticle.tags,
					asDraft: false,
				})
			} else {
				push("/notice")
			}
		}
	}, [currentArticle])

	if (!currentArticle) {
		return <></>
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<div className="grid gap-x-4">
				<div className="flex flex-col relative">
					<div className="flex gap-4 items-center xs:flex-col xs:items-start xs:gap-1 sm:gap-4 sm:flex-row sm:items-center">
						<button
							type="button"
							className={cn(
								"uppercase transition-all font-semibold relative text-blue-500 hover:text-blue-600 hover:underline group/id"
							)}
							onClick={() => {
								navigator.clipboard.writeText(
									`${props.params.article.toUpperCase()} ${currentArticle.title}`
								)
							}}
						>
							{currentArticle.id}
							<IoCopy className="absolute opacity-0 transition-all top-[50%] translate-y-[-50%] w-3 h-3 left-[-20px] text-neutral-400 group-hover/id:opacity-100" />
						</button>
						<p className="text-neutral-400">
							Created {formatDistance(currentArticle.createdAt, new Date(), { addSuffix: true })}
						</p>
						{currentArticle.modifiedAt && (
							<p className="text-neutral-400">
								Modified{" "}
								{formatDistance(currentArticle.modifiedAt, new Date(), { addSuffix: true })}
							</p>
						)}
					</div>
					{isEdit ? (
						<>
							<div className="sticky top-[4rem] xs:top-0 lg:top-[4rem] bg-light dark:bg-dark-200 pb-2 z-50">
								<br />
								<div className="grid grid-cols-[1fr_16px] items-center gap-2">
									<input
										type="text"
										{...register("title")}
										placeholder="Summary"
										className="bg-transparent text-2xl font-bold border-b-2 focus:border-b-blue-500 outline-0 w-full dark:border-b-light/20 dark:focus:hover-b-blue-400"
									/>
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
																	className="transition-all hover:bg-blue-500/10 cursor-pointer dark:text-light dark:hover:bg-blue-400/10"
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
											<motion.div
												key={i}
												initial={{ scale: 0.9, opacity: 0.8 }}
												animate={{ scale: 1, opacity: 1 }}
												exit={{ scale: 0.2, opacity: 0, y: -5 }}
											>
												<span
													className="text-neutral-700 px-1 py-0.5 rounded-sm cursor-pointer flex items-center text-center relative group/nwi transition-all hover:translate-x-[15px]"
													style={{ backgroundColor: f.color }}
													onClick={() => {
														const nw = getValues("tags")
														setValue("tags", [...nw.filter(nwi => nwi.index !== f.index)])
													}}
												>
													<IoCloseCircleOutline className="text-red-500 mr-1 absolute opacity-0 translate-x-[calc(-50%-12px)] transition-all group-hover/nwi:opacity-100" />
													{f.index}
												</span>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</div>
							<div>
								<Controller
									control={control}
									name="htmlContent"
									render={({ field }) => (
										<RichTextEditor initialValue={field.value} setValue={setValue} />
									)}
								/>
							</div>
							<br />
							<div className="flex gap-2 pb-[10rem] xs:pb-5 lg:pb-[10rem]">
								<DefButton type="submit" className="bg-sky-500 text-white hover:bg-sky-600">
									Save
								</DefButton>
								<GhostButton
									type="button"
									onClick={() => {
										setEdit(false)
									}}
								>
									Cancel
								</GhostButton>
							</div>
						</>
					) : (
						<div className="pt-5 xs:pb-5">
							<div className="flex items-center gap-4">
								<h1
									className={cn(
										"font-bold text-2xl transition-all hover:bg-accent-blue/30 cursor-pointer rounded dark:text-light"
									)}
									onClick={() => {
										setEdit(true)
									}}
								>
									{currentArticle.title}
								</h1>
								<div className="flex gap-2 items-center">
									<button
										type="button"
										onClick={() => {
											setEdit(true)
										}}
									>
										<FiEdit2 className="w-4 h-4 text-neutral-500 transition-all hover:text-blue-500" />
									</button>
									<DropdownMenu>
										<DropdownMenuTrigger type="button">
											<SlOptions className="w-4 h-4 text-neutral-500 transition-all hover:text-blue-500" />
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-light rounded p-0 py-2 select-none min-w-[15rem] dark:bg-dark-100 dark:border-light/20 z-10">
											<DropdownMenuItem
												className="text-rose-500 hover:!text-rose-600 dark:hover:bg-light/5"
												onClick={() => {
													handleDeleteTask()
												}}
											>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
							<div className="flex gap-2 flex-wrap mt-1 min-h-[1.5rem]">
								<AnimatePresence>
									{wTags.map((f, i) => (
										<Tag
											key={i}
											value={f}
											disabled
											onDelete={() => {
												const nw = getValues("tags")
												setValue("tags", [...nw.filter(nwi => nwi.index !== f.index)])
											}}
										/>
									))}
								</AnimatePresence>
							</div>
							<div
								className="mt-2 tiptap"
								dangerouslySetInnerHTML={{ __html: currentArticle.htmlContent }}
							></div>
						</div>
					)}
				</div>
			</div>
		</form>
	)
}

const c = observer(ArticlePage)
export { c as CArticlePage }
