import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Set up workflow',
}

export default function SetupLayout(
	props: Readonly<{ children: React.ReactNode }>
) {
	return props.children
}
