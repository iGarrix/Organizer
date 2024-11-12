/* eslint-disable react/display-name */
"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { AlertCircleIcon } from "lucide-react"
import React, { ComponentPropsWithoutRef, useId } from "react"
import { ZodProps } from "../zodProps"
import s from "./zodField.style.module.scss"
interface IZodFieldProps extends ComponentPropsWithoutRef<"input">, ZodProps {}

const ZodField = React.forwardRef<HTMLInputElement, IZodFieldProps>(
	({ className, errorMessage, upperPlaceholder, ...props }: IZodFieldProps, ref) => {
		const id = useId()
		return (
			<div
				className={cn(s.cont, "dark:bg-dark-100 dark:border-light/20", !!errorMessage && s.error)}
			>
				<label htmlFor={id}>
					{upperPlaceholder}{" "}
					{!!errorMessage && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<AlertCircleIcon className="text-rose-500" />
								</TooltipTrigger>
								<TooltipContent className="border text-rose-500 shadow-none">
									{errorMessage}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</label>
				<input className={cn(className)} ref={ref} {...props} id={id} />
				{/* { */}
			</div>
		)
	}
)

export default ZodField
