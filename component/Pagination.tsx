import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
    currentPage: number
    totalCount: number
    limit: number
    onPageChange: (page: number) => void
}

export default function PaginationComponent({ currentPage, totalCount, limit, onPageChange }: Props) {
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <Pagination className="mt-4 flex gap-2">
            <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className="bg-[#a989f6] hover:bg-[#926fe6] text-white font-semibold px-4 py-2 rounded-md"
            >
                Previous
            </PaginationPrevious>
            <PaginationContent>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <PaginationItem key={idx}>
                        <PaginationLink
                            onClick={() => onPageChange(idx + 1)}
                            className={currentPage === idx + 1 ? "bg-[#926fe6] text-white" : ""}
                        >
                            {idx + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
            <PaginationNext
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className="bg-[#a989f6] hover:bg-[#926fe6] text-white font-semibold px-4 py-2 rounded-md"
            >
                Next
            </PaginationNext>
        </Pagination>
    )
}
