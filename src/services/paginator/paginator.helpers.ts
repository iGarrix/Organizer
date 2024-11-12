import { paginate } from "./paginator.service"
import { ITask } from "@/api/storage/db.types"

export const TASK_LIMIT = 30

export function generatePaginationByParams(tasks: ITask[], searchParams: any) {
	const page = Number(searchParams.page) || 1
	const limit = Number(searchParams.limit) || TASK_LIMIT
	const search = searchParams.search
	if (search) {
		return paginate(
			tasks.filter(f => f.title.toLowerCase().includes(search)),
			{ page: page, limit: limit }
		)
	}
	return paginate(tasks, { page: page, limit: limit })
}
