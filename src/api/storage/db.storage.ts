import { ScratchSetupIdentityValues } from "@/app/setup/scratchway/types"
import { LocalStorageContants } from "@/app/types"
import { makeAutoObservable } from "mobx"
import { ITag, ITask, IWorkflow, TWorkflowField } from "./db.types"

class Storage {
	workflow: IWorkflow | null = null
	tasks: ITask[] = []
	task_drafts: ITask[] = []
	articles: any[] = []
	article_drafts: any[] = []
	isGotted: boolean = false
	constructor() {
		makeAutoObservable(this)
	}

	initializeStorageByForm = (
		tags: ITag[],
		fields: TWorkflowField[],
		formState: ScratchSetupIdentityValues
	) => {
		if (typeof window !== "undefined") {
			const workflow: IWorkflow = {
				name: formState.name,
				id: formState.id,
				globalFields: fields,
				tags: tags,
			}
			this.workflow = workflow
			const workflow_string = JSON.stringify(workflow)
			localStorage.setItem(LocalStorageContants.Workflow, workflow_string)
		}
	}

	initializeStorageByImport = () => {
		if (typeof window !== "undefined") {
			//localStorage.setItem('counter', JSON.stringify(this.count))
		}
	}

	loadFromLocalStorage = () => {
		if (typeof window !== "undefined") {
			const _workflows = localStorage.getItem(LocalStorageContants.Workflow)
			if (_workflows) {
				this.workflow = JSON.parse(_workflows) as IWorkflow
			}
			// tasks
			const _tasks = localStorage.getItem(LocalStorageContants.Tasks)
			if (_tasks) {
				this.tasks = JSON.parse(_tasks) as ITask[]
			}
			const _drafts = localStorage.getItem(LocalStorageContants.TaskDrafts)
			if (_drafts) {
				this.task_drafts = JSON.parse(_drafts) as ITask[]
			}
			this.isGotted = true
		}
	}

	clearStorage = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem(LocalStorageContants.Workflow)
			localStorage.removeItem(LocalStorageContants.Tasks)
			localStorage.removeItem(LocalStorageContants.Notifications)
		}
	}

	createTask = (task: ITask) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.Tasks)
			if (tasksJson) {
				task.id = `${this.workflow?.id.toUpperCase()}-${this.tasks.length + 1}`
				const tasks = JSON.parse(tasksJson) as ITask[]
				const updated = [...tasks, task]
				localStorage.setItem(LocalStorageContants.Tasks, JSON.stringify(updated))
				this.tasks = updated
				return
			}
			task.id = `${this.workflow?.id.toUpperCase()}-1`
			const newTaskList = JSON.stringify([task] as ITask[])
			localStorage.setItem(LocalStorageContants.Tasks, newTaskList)
			this.tasks = [task]
		}
	}

	createDraft = (draft: ITask) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.TaskDrafts)
			if (tasksJson) {
				draft.id = `draft-${this.task_drafts.length + 1}`
				const tasks = JSON.parse(tasksJson) as ITask[]
				const updated = [...tasks, draft]
				localStorage.setItem(LocalStorageContants.TaskDrafts, JSON.stringify(updated))
				this.task_drafts = updated
				return
			}
			draft.id = `draft-1`
			const newTaskList = JSON.stringify([draft] as ITask[])
			localStorage.setItem(LocalStorageContants.TaskDrafts, newTaskList)
			this.task_drafts = [draft]
		}
	}

	clearDrafts = () => {
		this.task_drafts = []
		localStorage.removeItem(LocalStorageContants.TaskDrafts)
	}

	editTask = (task: ITask) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.Tasks)
			if (tasksJson) {
				const tasks = JSON.parse(tasksJson) as ITask[]
				const findTaskId = tasks.findIndex(f => f.id === task.id)
				if (tasks[findTaskId]) {
					task.modifiedAt = new Date()
					tasks[findTaskId] = task
					localStorage.setItem(LocalStorageContants.Tasks, JSON.stringify(tasks))
					this.tasks = tasks
					return
				}
				throw "Task not found"
			}
			throw "Tasks not found"
		}
	}

	deleteTask = (taskId: string) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.Tasks)
			if (tasksJson && tasksJson.length !== 0) {
				const tasks = JSON.parse(tasksJson) as ITask[]
				const filteredTasks = tasks.filter((f, i) => f.id !== taskId)
				if (filteredTasks.length === 0) {
					localStorage.removeItem(LocalStorageContants.Tasks)
					this.tasks = []
					return
				}
				if (filteredTasks) {
					localStorage.setItem(LocalStorageContants.Tasks, JSON.stringify(filteredTasks))
					this.tasks = filteredTasks
					return
				}
				throw "Task not found"
			}
			throw "Tasks not found"
		}
	}
}

export const dbStorage = new Storage()
