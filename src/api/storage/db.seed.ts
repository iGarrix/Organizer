/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFieldEnum, IFieldMultiEnum, IFieldState, ITag, TWorkflowField } from "./db.types"

export const seedTags: ITag[] = [
	{
		index: "Star",
		color: "#fcd34d",
	},
	{
		index: "Has more relations",
		color: "#aabafa",
	},
	{
		index: "Critical",
		color: "#ffabcd",
	},
	{
		index: "Minor",
		color: "#a7fce0",
	},
	{
		index: "Major",
		color: "#fcc89f",
	},
	{
		index: "Bug",
		color: "#fca9b4 ",
	},
	// ...[...Array(20)].map((_f, i) => {
	// 	return { index: `tag_${i}`, color: '#ffffff' }
	// }),
]

/* export const seedFields: TWorkflowField[] = [
	{
		fieldName: "Type",
		fieldType: "list",
		value: {
			selectedIndex: 0,
			options: ["Task", "Release", "Feature", "Hotfix", "Bug-fix", "To be discused"],
		} as IFieldEnum,
	},
	{
		fieldName: "Task state",
		fieldType: "state",
		value: {
			selectedIndex: 0,
			states: [
				{ index: "Submitted", isResolved: false },
				{ index: "Open", isResolved: false },
				{ index: "Is progress", isResolved: false },
				{ index: "In review", isResolved: false },
				{ index: "Ready for testing", isResolved: false },
				{ index: "Done", isResolved: true },
				{ index: "Should return later", isResolved: true },
			],
		} as IFieldState,
	},
	{
		fieldName: "Priority",
		fieldType: "list",
		value: {
			selectedIndex: 2,
			options: ["Critical", "High", "Normal", "Low"],
		} as IFieldEnum,
	},
	{
		fieldName: "Time spent",
		fieldType: "period",
		value: null,
	},
	{
		fieldName: "Started At",
		fieldType: "date",
		value: null,
	},
	{
		fieldName: "Deadline",
		fieldType: "date",
		value: null,
	},
	{
		fieldName: "Sprint",
		fieldType: "multi-list",
		value: {
			selectedOptions: [0],
			options: ["Q1 Start", "Q2 Continue", "Q3 Pre-release", "Q4 Release"],
		} as IFieldMultiEnum,
	},
	{
		fieldName: "Whitenotes",
		fieldType: "string",
		value: "",
	},
] */

export const seedFields: TWorkflowField[] = [
	{
		fieldName: "Type",
		fieldType: "list",
		value: {
			selectedIndex: 0,
			options: ["Task", "Release", "Feature", "Hotfix", "Bug-fix", "Quick react"],
		} as IFieldEnum,
	},
	{
		fieldName: "Task state",
		fieldType: "state",
		value: {
			selectedIndex: 0,
			states: [
				{ index: "Submitted", isResolved: false },
				{ index: "Open", isResolved: false },
				{ index: "Is progress", isResolved: false },
				{ index: "In review", isResolved: false },
				{ index: "Ready for testing", isResolved: false },
				{ index: "Should return later", isResolved: false },
				{ index: "Done", isResolved: true },
				{ index: "Resolved", isResolved: true },
			],
		} as IFieldState,
	},
	{
		fieldName: "Priority",
		fieldType: "list",
		value: {
			selectedIndex: 2,
			options: ["Critical", "Major", "Normal", "Minor"],
		} as IFieldEnum,
	},
	{
		fieldName: "Should start at",
		fieldType: "date",
		value: null,
	},
	{
		fieldName: "Deadline at",
		fieldType: "date",
		value: null,
	},
	{
		fieldName: "Spent around",
		fieldType: "period",
		value: null,
	},
	{
		fieldName: "Sprint",
		fieldType: "multi-list",
		value: {
			selectedOptions: [0],
			options: ["Oct. 1 - 31", "Nov. 1 - 10", "Nov. release date"],
		} as IFieldMultiEnum,
	},
	{
		fieldName: "Note",
		fieldType: "string",
		value: "",
	},
]
