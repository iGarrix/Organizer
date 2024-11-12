"use client"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"
interface IGhostButtonProps extends ComponentPropsWithoutRef<"button"> {}

function GhostButton({ className, children, ...props }: IGhostButtonProps) {
	return (
		<button
			className={cn(
				"px-4 rounded py-1 transition-all text-sm select-none bg-transparent border-2 border-neutral-200 hover:border-neutral-300 dark:border-dark-100 dark:hover:border-neutral-500 dark:hover:bg-transparent dark:text-neutral-400 dark:hover:text-neutral-200",
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export default GhostButton
