import { Metadata, PaginatedResult, PaginationOptions } from "./paginator.types"

export type SortFunction<T> = (a: T, b: T) => number

export function paginate<T>(data: T[], options: PaginationOptions): PaginatedResult<T> | null {
	const { page, limit } = options

	if (page < 1) {
		return null
	}

	if (limit < 1) {
		return null
	}

	const totalItems = data.length
	const totalPages = Math.ceil(totalItems / limit)
	const offset = (page - 1) * limit

	const paginatedData = data.slice(offset, offset + limit)

	const metadata: Metadata = {
		totalItems,
		itemCount: paginatedData.length,
		itemsPerPage: limit,
		totalPages,
		currentPage: page,
	}

	return {
		list: paginatedData,
		metadata,
	}
}
