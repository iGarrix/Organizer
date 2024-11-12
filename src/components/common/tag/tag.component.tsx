"use client"
import { ITag } from "@/api/storage/db.types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { IoCloseCircleOutline } from "react-icons/io5"
interface ITagProps {
	value: ITag
	disabled?: boolean
	onDelete?: () => void
}

function Tag({ ...props }: ITagProps) {
	return (
		<motion.div
			initial={{ scale: 0.9, opacity: 0.8 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.2, opacity: 0, y: -5 }}
		>
			<span
				className={cn(
					"text-neutral-700 px-1 py-0.5 rounded-sm flex items-center text-center relative group/nwi transition-all ",
					!props.disabled && "hover:translate-x-[15px] cursor-pointer"
				)}
				style={{ backgroundColor: props.value.color }}
				onClick={!props.disabled ? props.onDelete : undefined}
			>
				<IoCloseCircleOutline
					className={cn(
						"text-red-500 mr-1 absolute opacity-0 translate-x-[calc(-50%-12px)] transition-all group-hover/nwi:opacity-100",
						props.disabled && "hidden"
					)}
				/>
				{props.value.index}
			</span>
		</motion.div>
	)
}

export default Tag
