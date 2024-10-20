/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ComponentPropsWithoutRef } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoIosMenu } from 'react-icons/io'
export interface SortableDragItemProps extends ComponentPropsWithoutRef<'div'> {
	childId: string
	children: React.ReactNode
	additionalFunks?: React.ReactNode
	onRemove: () => void
}

export const SortableDragItem: React.FC<SortableDragItemProps> = ({
	childId,
	children,
	className,
	onRemove,
	additionalFunks,
	style: unStyled,
	...props
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: childId,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		// transition,
	}

	return (
		<div
			ref={setNodeRef}
			style={{ ...style, ...unStyled }}
			{...attributes}
			className={cn(
				`bg-white rounded select-none px-4 py-2 text-xl grid  items-center overflow-hidden gap-2 cursor-default relative group/drag`,
				isDragging && 'shadow-md opacity-70 z-[200]',
				additionalFunks
					? 'grid-cols-[20px_1fr_20px_20px]'
					: 'grid-cols-[20px_1fr_20px]',
				className
			)}
		>
			<div className='bg-gradient-to-r from-light/0 to-light transition-all w-full h-full absolute opacity-0 group-hover/drag:opacity-100'></div>
			<IoIosMenu
				{...listeners}
				className='cursor-grab outline-none w-5 h-5 z-10'
			/>
			<div className='grow rounded overflow-hidden z-10 w-full h-full'>
				{children}
			</div>
			{additionalFunks}
			<AiOutlineDelete
				className='cursor-pointer transition-all hover:text-rose-500 w-5 h-5 z-10'
				onClick={() => {
					onRemove()
				}}
			/>
		</div>
	)
}
