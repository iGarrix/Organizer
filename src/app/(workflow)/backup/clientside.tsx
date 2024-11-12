"use client"

import { articleService } from "@/api/articles/articles.instance"
import { notificationService } from "@/api/notifications/notification.instance"
import { INotificationStorageInstance } from "@/api/notifications/notifications.types"
import { useStorage } from "@/api/storage/db.provider"
import DefButton from "@/components/common/buttons/defbutton/defbutton.component"
import { BackupSchema, BackupValues, TBackup } from "@/forms/backup-validation/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

function CBackupPage(props: { searchParams: { [key: string]: string | null } }) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<BackupValues>({
		defaultValues: {
			tasks: true,
			t_draft: true,
			articles: true,
			art_draft: true,
			notifications: true,
			checker: false,
		},
		resolver: zodResolver(BackupSchema),
	})
	const [size, setSize] = useState(0)
	const { workflow, tasks, task_drafts, clearStorage } = useStorage()
	const { articles, article_drafts, clearAll } = articleService
	const { notifications, haveNoReaded, clearAll: clearAllNotifications } = notificationService
	const { push, replace } = useRouter()
	const onSubmit = (values: BackupValues) => {
		if (workflow) {
			const backupObject: TBackup = {
				workflow: toJS(workflow),
				tasks: values.tasks ? toJS(tasks) : [],
				task_drafts: values.t_draft ? toJS(task_drafts) : [],
				articles: values.articles ? toJS(articles) : [],
				article_drafts: values.art_draft ? toJS(article_drafts) : [],
				notifications: values.notifications
					? ({
							notifications: toJS(notifications),
							haveNoReaded: haveNoReaded,
					  } as INotificationStorageInstance)
					: null,
			}
			console.log(backupObject)
			const blob = new Blob([JSON.stringify(backupObject, null, 2)], {
				type: "application/json",
			})
			setSize(blob.size / 1024)
			if (values.checker) {
				//setValue("checker", false)
				reset({ ...values, checker: false })
				return
			}
			const url = URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.download = `${workflow.name}-backup.json`
			link.click()
			const transfer = props.searchParams.transfer
			if (transfer) {
				clearStorage()
				clearAll()
				clearAllNotifications()
				replace("/setup")
			}
		}
	}

	return (
		<div className="flex flex-col pb-[10rem]">
			<h1 className="text-xl font-bold text-center">Backup</h1>
			<br />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 items-center xs:items-stretch xs:px-2 md:px-0 md:items-center"
			>
				<div className="border rounded dark:border-light/20 p-4 md:min-w-[30rem]">
					<div className="flex justify-between items-center">
						<p className="text-lg">Tasks</p>
						<input type="checkbox" {...register("tasks")} className="w-5 h-5" />
					</div>
					<p className="text-neutral-400">Include all tasks in a new backup file</p>
				</div>
				<div className="border rounded dark:border-light/20 p-4 md:min-w-[30rem]">
					<div className="flex justify-between items-center">
						<p className="text-lg">Task drafts</p>
						<input type="checkbox" {...register("t_draft")} className="w-5 h-5" />
					</div>
					<p className="text-neutral-400">Include all task drafts in a new backup file</p>
				</div>
				<div className="border rounded dark:border-light/20 p-4 md:min-w-[30rem]">
					<div className="flex justify-between items-center">
						<p className="text-lg">Notes</p>
						<input type="checkbox" {...register("articles")} className="w-5 h-5" />
					</div>
					<p className="text-neutral-400">Include all notes in a new backup file</p>
				</div>
				<div className="border rounded dark:border-light/20 p-4 md:min-w-[30rem]">
					<div className="flex justify-between items-center">
						<p className="text-lg">Notice drafts</p>
						<input type="checkbox" {...register("art_draft")} className="w-5 h-5" />
					</div>
					<p className="text-neutral-400">Include all note drafts in a new backup file</p>
				</div>
				<div className="border rounded dark:border-light/20 p-4 md:min-w-[30rem]">
					<div className="flex justify-between items-center">
						<p className="text-lg">Notifications</p>
						<input type="checkbox" {...register("notifications")} className="w-5 h-5" />
					</div>
					<p className="text-neutral-400">Include all notifications in a new backup file</p>
				</div>

				<p className="text-neutral-400">
					Approximate size:{" "}
					<span className="font-semibold text-blue-500 dark:text-pink-400">
						{size.toPrecision(3)} MB
					</span>
				</p>
				<br />
				<div className="flex justify-start gap-2 md:min-w-[30rem]">
					<DefButton type="submit" className="xs:w-full md:w-auto py-2">
						{props.searchParams.transfer ? "Backup & Setup" : "Make backup"}
					</DefButton>
					<DefButton
						type="submit"
						className="xs:w-full md:w-auto py-2"
						onClick={() => {
							setValue("checker", true)
						}}
					>
						Check size
					</DefButton>
				</div>
			</form>
		</div>
	)
}
const CB = observer(CBackupPage)
export { CB as CBackupPage }
