import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Backup",
}

export default function BackupLayout(props: Readonly<{ children: React.ReactNode }>) {
	return props.children
}
