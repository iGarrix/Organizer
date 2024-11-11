"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "light" } = useTheme()
	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			richColors
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg dark:bg-dark-100" +
						" ",
					//"dark:group-[.toaster]:bg-dark-100 dark:group-[.toaster]:border-light/20 dark:group-[.toaster]:text-light",
					description: "group-[.toast]:text-neutral-500 dark:group-[.toast]:text-light",
					actionButton: "group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50",
					cancelButton: "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500",
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
