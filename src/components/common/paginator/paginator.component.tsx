import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CustomPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	// Helper function to generate page buttons
	const generatePageButtons = () => {
		const pageButtons = []
		const range = 3 // number of pages to show before and after the current page

		// Handle cases where totalPages is very small
		if (totalPages <= 4) {
			for (let i = 1; i <= totalPages; i++) {
				pageButtons.push(i)
			}
		} else {
			// Show first page and current page with range
			pageButtons.push(1)

			// Show ellipsis if there are more pages than the range before or after current page
			if (currentPage - range > 2) {
				pageButtons.push("...")
			}

			// Show pages around current page
			for (
				let i = Math.max(2, currentPage - range);
				i <= Math.min(totalPages - 1, currentPage + range);
				i++
			) {
				pageButtons.push(i)
			}

			// Show ellipsis if needed after the last page in the range
			if (currentPage + range < totalPages - 1) {
				pageButtons.push("...")
			}

			// Show last page
			if (totalPages > 1) pageButtons.push(totalPages)
		}

		return pageButtons
	}

	return (
		<PaginationContent>
			<PaginationItem
				className={`border-none rounded text-center h-10 px-3 font-semibold py-2 flex items-center justify-center leading-none cursor-pointer hover:text-blue-600`}
				onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
			>
				<ChevronLeft className="w-4 h-4 mr-1.5" />
				Previous
			</PaginationItem>
			{/* Render page buttons */}
			{generatePageButtons().map((page, index) =>
				page === "..." ? (
					<PaginationItem key={index}>
						<PaginationEllipsis />
					</PaginationItem>
				) : (
					<PaginationItem
						key={index}
						className={`border-none rounded text-center h-10 px-3 py-2 flex items-center justify-center leading-none cursor-pointer hover:bg-blue-100 ${
							currentPage === page ? "bg-blue-200" : ""
						}`}
						onClick={() => onPageChange(Number(page))}
					>
						<span className="w-4">{page}</span>
					</PaginationItem>
				)
			)}
			<PaginationItem
				className={`border-none rounded text-center h-10 px-3 font-semibold py-2 flex items-center justify-center leading-none cursor-pointer hover:text-blue-600`}
				onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
			>
				Next
				<ChevronRight className="w-4 h-4 ml-1.5" />
			</PaginationItem>
		</PaginationContent>
	)
}
