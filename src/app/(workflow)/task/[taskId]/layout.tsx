import type { Metadata } from "next"

export async function generateMetadata(props: { params: { taskId: string } }): Promise<Metadata> {
	return {
		title: `${props.params.taskId.toUpperCase()}`,
	}
}

export default function TaskLayout(props: Readonly<{ children: React.ReactNode }>) {
	return props.children
}
