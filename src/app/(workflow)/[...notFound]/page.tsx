'use client'

import { Link } from 'next-view-transitions'
import { FaArrowRight } from 'react-icons/fa'

export default function NotFound() {
	return (
		<div className='w-full flex flex-col items-center justify-center h-full min-h-[94svh]'>
			<h1 className='font-borel font-bold text-3xl'>Page not Found</h1>
			<Link
				href={'/'}
				className='text-lg flex items-center group gap-2 transition-all text-blue-500'
			>
				All Tasks{' '}
				<FaArrowRight className='transition-all group-hover:translate-x-1' />{' '}
			</Link>
		</div>
	)
}
