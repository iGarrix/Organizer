import { ReactNode } from "react"

export enum NotificationType {
	Info = "info",
	Error = "error",
	Warn = "warn",
}

export interface INotification {
	title: string
	type: NotificationType
	content?: string
	createdAt: Date
}

export interface INotificationStorageInstance {
	haveNoReaded: boolean
	notifications: INotification[]
}
