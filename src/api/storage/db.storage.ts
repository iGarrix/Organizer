import { ScratchSetupIdentityValues } from '@/app/setup/scratchway/types'
import { LocalStorageContants } from '@/app/types'
import { makeAutoObservable } from 'mobx'
import { ITag, ITask, IWorkflow, TWorkflowField } from './db.types'

class Storage {
	workflow: IWorkflow | null = null
	tasks: ITask[] = []
	isGotted: boolean = false
	constructor() {
		makeAutoObservable(this)
	}

	initializeStorageByForm = (
		tags: ITag[],
		fields: TWorkflowField[],
		formState: ScratchSetupIdentityValues
	) => {
		if (typeof window !== 'undefined') {
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
		if (typeof window !== 'undefined') {
			//localStorage.setItem('counter', JSON.stringify(this.count))
		}
	}

	loadFromLocalStorage = () => {
		if (typeof window !== 'undefined') {
			const _workflows = localStorage.getItem(LocalStorageContants.Workflow)
			if (_workflows) {
				this.workflow = JSON.parse(_workflows) as IWorkflow
			}
			this.isGotted = true
		}
	}

	clearStorage = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(LocalStorageContants.Workflow)
			localStorage.removeItem(LocalStorageContants.Tasks)
		}
	}
}

export const dbStorage = new Storage()
