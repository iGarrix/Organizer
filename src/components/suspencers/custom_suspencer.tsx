'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CustomSuspencer(props: { message: string }) {
	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ ease: 'linear', duration: 0.1 }}
			className='w-full h-svh flex items-center justify-center flex-col overflow-hidden fixed z-[1000] bg-light'
		>
			<Image
				src={
					'https://i.pinimg.com/originals/20/11/83/20118357fd6998f6fc9406581e1fed15.gif'
				}
				alt='loader1'
				width={200}
				height={200}
				priority
				className='object-cover'
			/>
			<h1 className='text-sm text-neutral-700 text-center text-balance'>
				{props.message}
			</h1>
		</motion.div>
	)
}
