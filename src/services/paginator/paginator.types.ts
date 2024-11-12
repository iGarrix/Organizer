export interface PaginationOptions {
	page: number
	limit: number
}

export interface Metadata {
	totalItems: number
	itemCount: number
	itemsPerPage: number
	totalPages: number
	currentPage: number
}

export interface PaginatedResult<T> {
	list: T[]
	metadata: Metadata
}
