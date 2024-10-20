'use client'
import { useStorage } from '@/api/storage/db.provider'
import src from '@/app/favicon.ico'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, useState } from 'react'
import { CiBoxList, CiShoppingTag } from 'react-icons/ci'
import { GoWorkflow } from 'react-icons/go'
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineDarkMode } from 'react-icons/md'
import { navHeader } from '../common/buttons/defbutton/header.types'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'
import HeaderAccount from './header.account.component'
import HeaderItem from './header.item.component'

interface IHeaderProps
	extends Omit<ComponentPropsWithoutRef<'header'>, 'children'> {}

function Header({ className, ...props }: IHeaderProps) {
	const [isSetupAnother, setSetupAnother] = useState(false)
	const pathname = usePathname()
	const { clearStorage, workflow } = useStorage()
	const { push } = useRouter()
	return (
		<header
			className={cn(
				'px-[5rem] border-b backdrop-blur-xl sticky top-0 left-0 flex items-center gap-5 overflow-hidden',
				className
			)}
			{...props}
		>
			<AlertDialog open={isSetupAnother} onOpenChange={setSetupAnother}>
				<AlertDialogContent className='!bg-white !text-black'>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure that you want to set up another workspace instead of
							current?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className='!bg-neutral-100 border-none hover:!bg-rose-500'>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className='!bg-neutral-100 hover:!bg-emerald-500 hover:!text-light'
							onClick={() => {
								clearStorage()
								setSetupAnother(false)
								push('/setup')
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<div className='flex items-center gap-2'>
				<Image src={src} alt='icon' />
				<h1 className='font-borel font-black text-2xl translate-y-2'>
					Organizer
				</h1>
			</div>
			<nav className='*:capitalize *:h-full *:flex *:items-center *:py-5 *:px-3 flex'>
				{navHeader.map((item, i) => (
					<HeaderItem
						key={i}
						link={item.pathname}
						isSelected={
							item.type === 'equal'
								? pathname === item.pathname
								: pathname.includes(item.pathname)
						}
					>
						{item.title}
					</HeaderItem>
				))}
				<HeaderItem
					link={'/new-task'}
					isSelected={pathname.includes('/new-task')}
					className='border-l'
				>
					New task
				</HeaderItem>
			</nav>
			<div className='ml-auto flex items-center gap-4'>
				<button className='transition-all hover:-translate-y-[2px]'>
					<MdOutlineDarkMode className='w-6 h-6 text-neutral-700' />
				</button>
				<button className='transition-all hover:-translate-y-[2px]'>
					<IoNotificationsOutline className='w-6 h-6 text-neutral-700' />
				</button>
				<DropdownMenu>
					<DropdownMenuTrigger className='outline-none transition-all  hover:-translate-y-[2px]'>
						<IoSettingsOutline className='w-6 h-6 text-neutral-700' />
					</DropdownMenuTrigger>
					<DropdownMenuContent className='bg-light/80 backdrop-blur-xl shadow-none border *:px-4 p-0 *:rounded-none *:grid *:grid-cols-[20px_1fr] *:gap-1 *:cursor-pointer !mt-[1rem] !translate-x-[-33.3%]'>
						<DropdownMenuItem>
							<GoWorkflow className='w-5 h-5' /> Workflow management
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CiBoxList className='w-5 h-5' /> Task fields
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CiShoppingTag className='w-5 h-5' /> Tags
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{workflow && (
					<HeaderAccount
						setSetupAnother={setSetupAnother}
						workflow={workflow}
					/>
				)}
			</div>
		</header>
	)
}

export default observer(Header)
