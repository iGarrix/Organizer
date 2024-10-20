'use client'

import { IWorkflow } from '@/api/storage/db.types'
import { BiLogOutCircle } from 'react-icons/bi'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export interface IHeaderAccountProps {
	workflow: IWorkflow
	setSetupAnother: (_open: boolean) => void
}

function HeaderAccount(props: IHeaderAccountProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none select-none'>
				<div className='bg-gradient-to-br from-accent-blue to-accent-green rounded-lg w-9 h-9 flex items-center justify-center transition-all hover:scale-105'>
					<span className='text-white font-bold leading-none tracking-wider text-center uppercase'>
						ct
					</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-light/80 backdrop-blur-xl shadow-none border *:px-4 p-0 *:rounded-none *:grid *:grid-cols-[20px_1fr] *:gap-1 *:cursor-pointer !mt-[0.5rem] !translate-x-[-33.3%]'>
				<DropdownMenuLabel className='!grid !grid-cols-[36px_1fr] !gap-2 !px-2 !py-3 !cursor-default bg-gradient-to-b from-accent-blue/30 via-accent-green/20 to-light/80'>
					<div className='bg-gradient-to-br from-accent-blue to-accent-green rounded-lg w-9 h-9 flex items-center justify-center'>
						<span className='text-white font-bold leading-none tracking-wider text-center uppercase'>
							ct
						</span>
					</div>
					<div>
						<h2 className='leading-none'>{props.workflow.name}</h2>
						<p className='text-[12px] uppercase text-gray-500 tracking-widest font-medium'>
							{props.workflow.id}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuItem
					className='hover:!bg-rose-500 hover:!text-white'
					onClick={() => {
						props.setSetupAnother(true)
					}}
				>
					<BiLogOutCircle className='w-5 h-5' /> Set up another one
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HeaderAccount
