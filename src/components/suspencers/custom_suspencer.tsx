"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CustomSuspencer(props: { message: string }) {
	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ ease: "linear", duration: 0.1 }}
			className="w-full h-svh flex items-center justify-center flex-col overflow-hidden fixed z-[1000] bg-light dark:bg-dark-100"
		>
			<Image
				src={"https://i.pinimg.com/originals/97/57/67/975767e67adc18ad53d5a1a687cb6421.gif"}
				alt="loader1"
				width={180}
				height={180}
				priority
				className="object-cover mix-blend-difference contrast-200"
			/>
			<h1 className="text-sm text-neutral-700 text-center text-balance dark:text-light/90">
				{props.message}
			</h1>
		</motion.div>
	)
}
