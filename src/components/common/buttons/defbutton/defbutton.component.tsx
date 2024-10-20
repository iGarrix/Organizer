'use client'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
interface IDefButtonProps extends ComponentPropsWithoutRef<'button'> {}

function DefButton({ className, children, ...props }: IDefButtonProps) {
	return (
		<button
			className={cn(
				'bg-neutral-200 text-center text-neutral-800 px-6 rounded py-2 transition-all hover:bg-neutral-300 text-sm',
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export default DefButton
