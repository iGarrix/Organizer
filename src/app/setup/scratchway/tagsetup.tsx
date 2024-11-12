/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { ITag } from "@/api/storage/db.types"
import { HEXPattern } from "@/app/types"
import DefButton from "@/components/common/buttons/defbutton/defbutton.component"
import { SortableDragItem } from "@/components/common/drag/dragitem/dragitem.component"
import ZodField from "@/components/common/fields/zodField/zodField.component"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import { HexColorPicker } from "react-colorful"
import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form"
import { FaTag } from "react-icons/fa"
import { toast } from "sonner"
import { IScratchSetupWayProps } from "./scratchway"
import { ScratchSetupIdentityValues } from "./types"

export interface ITagSetupProps {
	nestedProps: IScratchSetupWayProps
	getValues: UseFormGetValues<ScratchSetupIdentityValues>
	setValue: UseFormSetValue<ScratchSetupIdentityValues>
	tags: ITag[]
	setTags: Dispatch<SetStateAction<ITag[]>>
	register: UseFormRegister<ScratchSetupIdentityValues>
	errors: FieldErrors<ScratchSetupIdentityValues>
	control: Control<ScratchSetupIdentityValues>
	handleDragEnd: (event: any, list: any, setter: any) => void
}

export default function TagSetup({
	nestedProps: props,
	handleDragEnd,
	getValues,
	setValue,
	register,
	errors,
	control,
	tags,
	setTags,
}: ITagSetupProps) {
	const addTag = () => {
		const index = getValues("tagValue")
		const color = getValues("tagColor")
		if (index && color) {
			const exist = tags.map(f => f.index).includes(index)
			if (exist) {
				toast.error(`${index} tag doesn't created: dublicate tags`)
				return
			}
			if (HEXPattern.test(color)) {
				setTags([...tags, { index: index, color: color }])
				setTimeout(() => {
					setValue("tagColor", "#ffffff")
					setValue("tagValue", "")
				}, 0.2)
			}
		}
	}
	const removeTag = (iterator: number) => {
		const tag = tags[iterator]
		if (tags.length > 1) {
			setTags(prevItems => prevItems.filter((_, i) => i !== iterator))
			toast.success(`'${tag.index}' deleted successfully`)
			return
		}
		toast.error(`'${tag.index}' as last tag can't be removed`)
	}
	return (
		<AnimatePresence>
			{props.progresPage.progress === 75 && (
				<motion.div
					initial={{ y: "10svh", opacity: 0, scale: 0.8 }}
					animate={{
						y: 0,
						opacity: 1,
						scale: 1,
						transition: { delay: 0.2 },
					}}
					exit={{
						y: "-5svh",
						opacity: 0,
						scale: 0.8,
						transition: { duration: 0.2 },
					}}
					className="flex flex-col gap-2"
				>
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={e => {
							handleDragEnd(e, tags, setTags)
						}}
					>
						<SortableContext
							items={tags.map((f, i) => {
								return `${i}`
							})}
							strategy={verticalListSortingStrategy}
						>
							<AnimatePresence>
								{tags.map((item, i) => (
									<motion.div
										initial={{ opacity: 1, scale: 0.7 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.7 }}
										key={i}
									>
										<SortableDragItem
											childId={`${i}`}
											className={`text-sm`}
											style={{ backgroundColor: item.color }}
											onRemove={() => {
												removeTag(i)
											}}
										>
											<span>{item.index}</span>
										</SortableDragItem>
									</motion.div>
								))}
							</AnimatePresence>
						</SortableContext>
					</DndContext>
					<Dialog>
						<DialogTrigger asChild>
							<button className="border rounded bg-neutral-100 py-1 transition-all hover:bg-neutral-200 dark:bg-dark-100 dark:hover:bg-light/10 dark:text-light dark:border-light/20">
								+
							</button>
						</DialogTrigger>
						<DialogContent className="dark:bg-dark-100 dark:border-light/20">
							<DialogHeader>
								<DialogTitle className="flex items-center gap-2 mb-2 dark:text-neutral-300">
									<FaTag className="w-4 h-4" /> Add a new tag
								</DialogTitle>
							</DialogHeader>
							<DialogDescription className="hidden" />
							<ZodField
								type="text"
								{...register("tagValue")}
								upperPlaceholder={"Tag name"}
								placeholder={"Fill here"}
								errorMessage={errors.tagValue?.message}
							/>
							<Controller
								control={control}
								name={"tagColor"}
								defaultValue={"#ffffff"}
								rules={{
									required: true,
								}}
								render={({ field }) => (
									<div className="grid grid-cols-2">
										<HexColorPicker
											className="w-full"
											color={field.value}
											defaultValue={"#ffffff"}
											onChange={field.onChange}
										/>
										<div
											className="w-full h-full shadow-xl rounded-2xl"
											style={{ backgroundColor: field.value }}
										></div>
									</div>
								)}
							/>
							<DialogFooter className="">
								<DialogClose asChild>
									<DefButton
										type="button"
										onClick={addTag}
										className="dark:bg-dark-100 dark:hover:bg-light/10 dark:text-light"
									>
										Add
									</DefButton>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<DefButton
						type="submit"
						className="dark:bg-dark-100 dark:hover:bg-light/10 dark:text-light"
					>
						Continue
					</DefButton>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
