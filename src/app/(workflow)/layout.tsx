import { MobxStorageProtector } from '@/api/storage/db.protector'
import Header from '@/components/header/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Workflow',
	description: 'Workflow',
}

export default function WorkflowLayout(
	props: Readonly<{ children: React.ReactNode }>
) {
	return (
		<MobxStorageProtector>
			<main className='min-h-svh w-full text-sm'>
				<Header />
				{props.children}
			</main>
		</MobxStorageProtector>
	)
}
