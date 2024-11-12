import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Create a new task",
}

export default function NewTaskLayout(props: Readonly<{ children: React.ReactNode }>) {
	return props.children
}
