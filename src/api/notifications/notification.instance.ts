import { makeAutoObservable } from "mobx"
import { INotification, INotificationStorageInstance } from "./notifications.types"
import { LocalStorageContants } from "@/app/types"

class NotificationService {
	notifications: INotification[] | null = null
	haveNoReaded: boolean = false
	constructor() {
		makeAutoObservable(this)
	}

	load = () => {
		if (typeof window !== "undefined") {
			const jsonData = localStorage.getItem(LocalStorageContants.Notifications)
			if (jsonData) {
				const data = JSON.parse(jsonData) as INotificationStorageInstance
				this.notifications = data.notifications
				this.haveNoReaded = data.haveNoReaded
			}
		}
	}

	clearAll = () => {
		if (typeof window !== "undefined") {
			this.haveNoReaded = false
			localStorage.removeItem(LocalStorageContants.Notifications)
			this.notifications = []
		}
	}

	readableall = () => {
		if (typeof window !== "undefined" && this.notifications) {
			const newInstance: INotificationStorageInstance = {
				haveNoReaded: false,
				notifications: this.notifications,
			}
			const stringify = JSON.stringify(newInstance)
			localStorage.setItem(LocalStorageContants.Notifications, stringify)
			this.haveNoReaded = false
		}
	}

	notify = (_notification: INotification) => {
		if (typeof window !== "undefined") {
			const jsonData = localStorage.getItem(LocalStorageContants.Notifications)
			this.haveNoReaded = true
			if (jsonData) {
				const storage = JSON.parse(jsonData) as INotificationStorageInstance
				let updated = [...storage.notifications]
				if (storage.notifications.length >= 30) {
					updated.shift()
					updated = [...updated, _notification]
				} else {
					updated = [...storage.notifications, _notification]
				}
				const newInstance: INotificationStorageInstance = {
					haveNoReaded: true,
					notifications: updated,
				}
				localStorage.setItem(LocalStorageContants.Notifications, JSON.stringify(newInstance))
				this.notifications = newInstance.notifications
				return
			}
			const newNotificationStorage: INotificationStorageInstance = {
				notifications: [_notification] as INotification[],
				haveNoReaded: true,
			}
			const stringify = JSON.stringify(newNotificationStorage)
			localStorage.setItem(LocalStorageContants.Notifications, stringify)
			this.notifications = [_notification]
		}
	}
	clear = (iterator: number) => {
		if (typeof window !== "undefined") {
			this.haveNoReaded = false
			const jsonData = localStorage.getItem(LocalStorageContants.Notifications)
			if (jsonData) {
				const notifications = JSON.parse(jsonData) as INotification[]
				const updated = notifications.filter((f, i) => i !== iterator)
				localStorage.setItem(LocalStorageContants.Tasks, JSON.stringify(updated))
				this.notifications = updated
				return
			}
		}
	}
}

export const notificationService = new NotificationService()
