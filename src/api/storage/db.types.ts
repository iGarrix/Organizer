import { IBase } from "@/app/types"

// TAGS
export interface ITag {
	index: string
	color: string
}

// TASKS
export interface ITask extends IBase {
	id?: string
	title: string
	htmlContent: string
	fields: TWorkflowField[]
	tags?: ITag[]
}

// FIELDS
export type TFieldTypes = "state" | "list" | "multi-list" | "date" | "period" | "string"

export interface IFieldPeriod {
	spent: string
}

export interface IFieldState {
	selectedIndex: number
	states: Array<{ index: string; isResolved: boolean }>
}

export interface IFieldEnum {
	selectedIndex: number
	options: Array<string>
}
export interface IFieldMultiEnum {
	selectedOptions: number[]
	options: string[]
}

export interface IField<TFieldValueType> {
	fieldName: string
	fieldType: TFieldTypes
	value: TFieldValueType | null
}

export type TWorkflowField = IField<
	IFieldState | IFieldEnum | IFieldMultiEnum | IFieldPeriod | Date | string
>

export interface IWorkflow {
	name: string
	id: string
	globalFields: TWorkflowField[]
	tags: ITag[]
}
