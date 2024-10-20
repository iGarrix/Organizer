export enum LoaderState {
	Loading = 'loading',
	Setup = 'setup',
	Initialized = 'initialized',
	InitExecuted = 'initExecuted',
}

export const HEXPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

export enum LocalStorageContants {
	Workflow = 'workflow',
	Tasks = 'tasks',
}
