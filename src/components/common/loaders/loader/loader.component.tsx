"use client"
import { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import { ImSpinner4 } from "react-icons/im"
interface ILoaderProps extends ComponentPropsWithoutRef<"div"> {}

function Loader({ className, children, ...props }: ILoaderProps) {
	return (
		<div className={cn("flex flex-col items-center justify-center", className)} {...props}>
			<ImSpinner4 className="animate-spin text-accent-blue text-4xl" />
		</div>
	)
}

export default Loader
