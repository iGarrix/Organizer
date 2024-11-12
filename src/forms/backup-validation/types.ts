import { IArticle } from "@/api/articles/articles.types"
import { INotificationStorageInstance } from "@/api/notifications/notifications.types"
import { ITask, IWorkflow } from "@/api/storage/db.types"
import { z } from "zod"

export type TBackup = {
	workflow: IWorkflow
	tasks: ITask[]
	task_drafts: ITask[]
	articles: IArticle[]
	article_drafts: IArticle[]
	notifications: INotificationStorageInstance | null
}

export const BackupSchema = z.object({
	tasks: z.boolean(),
	t_draft: z.boolean(),
	articles: z.boolean(),
	art_draft: z.boolean(),
	notifications: z.boolean(),
	checker: z.boolean(),
})

export type BackupValues = z.infer<typeof BackupSchema>
