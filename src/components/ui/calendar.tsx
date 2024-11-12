/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker } from "react-day-picker"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					// buttonVariants({ variant: 'outline' }),
					"h-7 w-7 p-0 opacity-50 hover:opacity-100"
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "text-neutral-500 rounded-md w-9 font-normal text-[0.8rem]",
				row: "flex w-full mt-2 dark:bg-dark-100",
				cell: "h-9 w-9 text-center text-sm p-0 relative dark:bg-dark-100  focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"h-9 w-9 p-0 font-normal aria-selected:opacity-100 dark:bg-dark-100"
				),
				day_range_end: "day-range-end",
				day_selected: "!bg-blue-500 !text-white dark:!bg-pink-400",
				day_today:
					"bg-neutral-100 text-neutral-500 dark:bg-dark-200 font-semibold border dark:border-dark-100 dark:bg-dark-100",
				day_outside:
					"day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:bg-dark-100",
				day_disabled: "text-neutral-500 opacity-50",
				day_range_middle: "aria-selected:bg-neutral-100 aria-selected:text-neutral-900",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
				IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
			}}
			{...props}
		/>
	)
}
Calendar.displayName = "Calendar"

export { Calendar }
