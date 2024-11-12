/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useStorage } from "@/api/storage/db.provider"
import { seedFields, seedTags } from "@/api/storage/db.seed"
import { ITag, TWorkflowField } from "@/api/storage/db.types"
import DefButton from "@/components/common/buttons/defbutton/defbutton.component"
import ZodField from "@/components/common/fields/zodField/zodField.component"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { arrayMove } from "@dnd-kit/sortable"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { REGEXP_ONLY_CHARS } from "input-otp"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { IProgressType } from "../page"
import FieldSetup from "./fieldsetup"
import TagSetup from "./tagsetup"
import { ScratchSetupIdentitySchema, ScratchSetupIdentityValues } from "./types"

export interface IScratchSetupWayProps {
	progresPage: IProgressType
	setProgresPage: (_new: IProgressType) => void
}

export default function ScratchSetupWay(props: IScratchSetupWayProps) {
	const {
		register,
		control,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitSuccessful },
	} = useForm<ScratchSetupIdentityValues>({
		defaultValues: {
			tagColor: "#ffffff",
		},
		resolver: zodResolver(ScratchSetupIdentitySchema),
	})

	const [tags, setTags] = useState<ITag[]>(seedTags)
	const [fields, setFields] = useState<TWorkflowField[]>(seedFields)

	const { initializeStorageByForm } = useStorage()
	const onSubmit = (values: ScratchSetupIdentityValues) => {
		// Submit identity
		if (props.progresPage.progress === 25) {
			props.setProgresPage({
				progress: 50,
				way: "scratch",
				message: "Task attached fields",
			})
		}
		// Submit fiedls
		else if (props.progresPage.progress === 50) {
			props.setProgresPage({
				progress: 75,
				way: "scratch",
				message: "Global pinable tags",
			})
		}
		// Submit tags - final successfull step
		else if (props.progresPage.progress === 75) {
			// init db
			initializeStorageByForm(tags, fields, values)
			props.setProgresPage({
				progress: 100,
				way: "scratch",
				message: "Workflow set up successfully",
			})
		}
	}

	const handleDragEnd = (event: any, list: any, setter: any) => {
		const { active, over } = event
		if (active.id !== over.id) {
			const currentList = list
			const oldIndex = list.findIndex((_: any, index: any) => `${index}` === active.id)
			const newIndex = list.findIndex((_: any, index: any) => `${index}` === over.id)

			const reorderedDraglist = arrayMove(currentList, oldIndex, newIndex)
			setter(reorderedDraglist)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid min-w-[20rem] gap-2">
			<div className="w-full max-w-[20rem]">
				<AnimatePresence>
					{props.progresPage.progress === 25 && (
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
						>
							<ZodField
								type="text"
								{...register("name")}
								upperPlaceholder={"Workflow name"}
								placeholder={"Fill here"}
								errorMessage={errors.name?.message}
							/>
							<br />
							<Controller
								name="id"
								control={control}
								render={({ field, fieldState }) => (
									<>
										<span className="text-sm text-neutral-500">Workflow ID</span>
										<InputOTP
											type="text"
											maxLength={8}
											pattern={REGEXP_ONLY_CHARS}
											className="uppercase"
											onChange={field.onChange}
											value={field.value}
										>
											<InputOTPGroup className="uppercase ">
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
												<InputOTPSlot index={6} />
												<InputOTPSlot index={7} />
											</InputOTPGroup>
										</InputOTP>
										<span className="text-sm text-rose-500">{fieldState.error?.message}</span>
									</>
								)}
							/>
							<DefButton
								type="submit"
								className={cn(
									"mt-2 w-full dark:bg-dark-100 dark:hover:bg-light/10 dark:text-light",
									isSubmitSuccessful && "bg-green-500"
								)}
							>
								Next
							</DefButton>
						</motion.div>
					)}
				</AnimatePresence>
				<FieldSetup
					fields={fields}
					setFields={setFields}
					nestedProps={props}
					handleDragEnd={handleDragEnd}
				/>
				<TagSetup
					register={register}
					errors={errors}
					tags={tags}
					setTags={setTags}
					setValue={setValue}
					getValues={getValues}
					nestedProps={props}
					control={control}
					handleDragEnd={handleDragEnd}
				/>
			</div>
		</form>
	)
}
