/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import {
	IFieldEnum,
	IFieldMultiEnum,
	IFieldState,
	TWorkflowField,
} from '@/api/storage/db.types'
import DefButton from '@/components/common/buttons/defbutton/defbutton.component'
import { SortableDragItem } from '@/components/common/drag/dragitem/dragitem.component'
import { cn } from '@/lib/utils'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import { toast } from 'sonner'
import { IScratchSetupWayProps } from './scratchway'

export interface ITagSetupProps {
	nestedProps: IScratchSetupWayProps

	fields: TWorkflowField[]
	setFields: Dispatch<SetStateAction<TWorkflowField[]>>
	handleDragEnd: (event: any, list: any, setter: any) => void
}

export default function FieldSetup({
	nestedProps: props,
	handleDragEnd,
	fields,
	setFields,
}: ITagSetupProps) {
	const [spyField, setSpyField] = useState<string | null>(null)

	const removeField = (iterator: number) => {
		const tag = fields[iterator]
		if (fields.length > 1) {
			setFields(prevItems => prevItems.filter((_, i) => i !== iterator))
			toast.success(`'${tag.fieldName}' deleted successfully`)
			return
		}
		toast.error(`'${tag.fieldName}' as last field can't be removed`)
	}

	const renderFieldValue = (props: TWorkflowField) => {
		const { fieldType, value } = props
		const isSpy = props.fieldName === spyField
		switch (fieldType) {
			case 'date':
				if (!value) {
					return <p className='text-neutral-400'>While creating</p>
				}
				return <p>{format(value as Date, 'dd.M.yyyy hh:mm')}</p>
			case 'string':
				return <p>{value as string}</p>
			case 'list':
				const vList = value as IFieldEnum
				if (isSpy) {
					return (
						<ul className='overflow-hidden'>
							{vList.options.map((f, i) => (
								<li key={i}>{f}</li>
							))}
						</ul>
					)
				}
				return <p>{vList.options[vList.selectedIndex] || vList.options[0]}</p>
			case 'multi-list':
				const vMultiList = value as IFieldMultiEnum
				if (isSpy) {
					return (
						<motion.ul>
							{vMultiList.options.map((f, i) => (
								<li key={i}>{f}</li>
							))}
						</motion.ul>
					)
				}
				return (
					<ul>
						{vMultiList.selectedOptions.map((f, i) => (
							<li key={i}>{vMultiList.options[f]}</li>
						))}
					</ul>
				)
			case 'period':
				return <>datetime</>
			case 'state':
				const vState = value as IFieldState
				const selectedState =
					vState.states[vState.selectedIndex] || vState.states[0]
				return (
					<div className='flex items-center gap-2'>
						<span>{selectedState.index}</span>
						<FaArrowRight />
						<span
							className={cn(
								selectedState.isResolved ? 'text-green-500' : 'text-neutral-400'
							)}
						>
							{selectedState.isResolved ? 'Done' : 'Unresolved'}
						</span>
					</div>
				)

			default:
				return <>unknown</>
		}
	}
	return (
		<AnimatePresence>
			{props.progresPage.progress === 50 && (
				<motion.div
					initial={{ y: '10svh', opacity: 0, scale: 0.8 }}
					animate={{
						y: 0,
						opacity: 1,
						scale: 1,
						transition: { delay: 0.2 },
					}}
					exit={{
						y: '-5svh',
						opacity: 0,
						scale: 0.8,
						transition: { duration: 0.2 },
					}}
					className='flex flex-col gap-2'
				>
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={e => {
							handleDragEnd(e, fields, setFields)
						}}
					>
						<SortableContext
							items={fields.map((f, i) => {
								return `${i}`
							})}
							strategy={verticalListSortingStrategy}
						>
							<AnimatePresence>
								{fields.map((item, i) => (
									<motion.div
										initial={{ opacity: 1, scale: 0.7 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.7 }}
										key={i}
									>
										<SortableDragItem
											childId={`${i}`}
											className={`text-sm`}
											onRemove={() => {
												removeField(i)
											}}
											additionalFunks={
												item.value &&
												Object.keys(item.value as IFieldEnum).includes(
													'options'
												) &&
												(spyField && spyField === item.fieldName ? (
													<GoEyeClosed
														className='w-5 h-5 z-10 cursor-pointer hover:text-blue-400'
														onClick={() => {
															setSpyField(null)
														}}
													/>
												) : (
													<GoEye
														className='w-5 h-5 z-10 cursor-pointer hover:text-blue-400'
														onClick={() => {
															setSpyField(item.fieldName)
														}}
													/>
												))
											}
										>
											<div className='flex flex-col'>
												<h3 className='text-lg font-semibold flex items-start gap-2'>
													{item.fieldName}{' '}
													<span className='text-sm font-normal text-[12px] bg-neutral-100 text-neutral-400 rounded-xl px-1'>
														{item.fieldType}
													</span>
												</h3>
												{renderFieldValue(item)}
											</div>
										</SortableDragItem>
									</motion.div>
								))}
							</AnimatePresence>
						</SortableContext>
					</DndContext>
					<DefButton type='submit'>Continue</DefButton>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
