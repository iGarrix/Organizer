'use client'
import { Link } from '@/components/common/link/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ComponentPropsWithoutRef } from 'react'
interface IHeaderItemProps extends ComponentPropsWithoutRef<'a'> {
	link: string
	isSelected?: boolean
}

function HeaderItem({
	className,
	children,
	link,
	isSelected,
	...props
}: IHeaderItemProps) {
	return (
		<Link
			href={link}
			className={cn(
				'relative transition-all hover:text-sky-500 select-none',
				isSelected && '!text-sky-600',
				className
			)}
			{...props}
		>
			{isSelected && (
				<motion.div
					layout
					layoutId={'header_layout'}
					transition={{ duration: 0.2, ease: 'circOut' }}
					className='w-full h-[3px] absolute bottom-0 rounded-b left-0 bg-sky-600 mix-blend-lighten rounded-md'
				></motion.div>
			)}
			<span>{children}</span>
		</Link>
	)
}
export default HeaderItem
