
export type TNav = {title: string, pathname: string, type: 'include' | 'equal'};

export const navHeader : TNav[] = [
	{
		title: 'To Do List',
		pathname: '/',
		type: 'equal',
	},
	{
		title: 'Kanban board',
		pathname: '/kanban-board',
		type: 'include',
	},
	{
		title: 'Timesheet',
		pathname: '/timesheet',
		type: 'include',
	},
	{
		title: 'Notice',
		pathname: '/notice',
		type: 'include',
	},
]