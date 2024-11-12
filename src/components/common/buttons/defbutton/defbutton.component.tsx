"use client"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"
interface IDefButtonProps extends ComponentPropsWithoutRef<"button"> {}

function DefButton({ className, children, ...props }: IDefButtonProps) {
	return (
		<button
			className={cn(
				"bg-neutral-200 text-center text-neutral-800 px-4 rounded py-1 transition-all hover:bg-neutral-300 text-sm select-none",
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export default DefButton
