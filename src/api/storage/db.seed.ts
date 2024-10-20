/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	IFieldEnum,
	IFieldMultiEnum,
	IFieldState,
	ITag,
	TWorkflowField,
} from './db.types'

export const seedTags: ITag[] = [
	{
		index: 'Has more relations',
		color: '#aabafa',
	},
	{
		index: 'Critical',
		color: '#ffabcd',
	},
	{
		index: 'Minor',
		color: '#a7fce0',
	},
	{
		index: 'Major',
		color: '#fcc89f',
	},
	{
		index: 'Bug',
		color: '#fca9b4 ',
	},
	// ...[...Array(20)].map((_f, i) => {
	// 	return { index: `tag_${i}`, color: '#ffffff' }
	// }),
]

export const seedFields: TWorkflowField[] = [
	{
		fieldName: 'Type',
		fieldType: 'list',
		value: {
			selectedIndex: 0,
			options: [
				'Task',
				'Release',
				'Feature',
				'Hotfix',
				'Bug-fix',
				'To be discused',
			],
		} as IFieldEnum,
	},
	{
		fieldName: 'Task state',
		fieldType: 'state',
		value: {
			selectedIndex: 6,
			states: [
				{ index: 'Submitted', isResolved: false },
				{ index: 'Open', isResolved: false },
				{ index: 'Is progress', isResolved: false },
				{ index: 'In review', isResolved: false },
				{ index: 'Ready for testing', isResolved: false },
				{ index: 'Done', isResolved: true },
				{ index: 'Should return later', isResolved: true },
			],
		} as IFieldState,
	},
	{
		fieldName: 'Priority',
		fieldType: 'list',
		value: {
			selectedIndex: 0,
			options: ['Critical', 'High', 'Normal', 'Low'],
		} as IFieldEnum,
	},
	{
		fieldName: 'Sprint',
		fieldType: 'multi-list',
		value: {
			selectedOptions: [0, 1],
			options: ['Q1', 'Q2', 'Q3', 'Q4'],
		} as IFieldMultiEnum,
	},
	{
		fieldName: 'Started At',
		fieldType: 'date',
		value: null,
	},
	{
		fieldName: 'Deadline',
		fieldType: 'date',
		value: null,
	},
]
