'use client'

import { IWorkflow } from '@/api/storage/db.types'
import { Link } from '@/components/common/link/link'
import { ChevronRight } from 'lucide-react'

interface IBreadscrumbProps {
	workflow: IWorkflow | null
	links: Array<string | { title: string; href: string }>
}

export const Breadscrumb: React.FC<IBreadscrumbProps> = ({
	workflow,
	...props
}) => {
	return (
		<div className='flex items-center gap-2'>
			<h2 className='font-semibold text-lg'>{workflow?.name}</h2>
			{props.links.map((f, i) => {
				if (Object.keys(f).includes('href')) {
					const obj = f as { title: string; href: string }
					return (
						<div key={i} className='flex items-center gap-2'>
							<ChevronRight className='w-4 h-4' />
							<Link
								href={obj.href}
								className='transition-all hover:text-blue-500'
							>
								{obj.title}
							</Link>
						</div>
					)
				}
				return (
					<div key={i} className='flex items-center gap-2'>
						<ChevronRight className='w-4 h-4' />
						<p className='text-gray-500'>{f as string}</p>
					</div>
				)
			})}
		</div>
	)
}
