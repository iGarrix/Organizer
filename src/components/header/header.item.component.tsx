"use client"
import { Link } from "@/components/common/link/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ComponentPropsWithoutRef } from "react"
interface IHeaderItemProps extends ComponentPropsWithoutRef<"a"> {
	link: string
	isSelected?: boolean
}

function HeaderItem({ className, children, link, isSelected, ...props }: IHeaderItemProps) {
	return (
		<Link
			href={link}
			className={cn(
				"relative transition-all hover:text-sky-500 dark:hover:text-sky-400 select-none dark:text-neutral-300",
				isSelected && "!text-sky-600 dark:!text-pink-400 ",
				className
			)}
			{...props}
		>
			{isSelected && (
				<motion.div
					layout
					layoutId={"header_layout"}
					transition={{ duration: 0.2, ease: "circOut" }}
					className="w-full h-[3px] absolute bottom-[-1px] left-0 bg-sky-600 mix-blend-lighten dark:bg-pink-400"
				></motion.div>
			)}
			<span>{children}</span>
		</Link>
	)
}
export default HeaderItem
