import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function PaginationComponent() {
    return (
        <Pagination className="mt-4">
            <PaginationPrevious className="bg-[#a989f6]  hover:bg-[#926fe6] text-white font-semibold px-4 py-2 rounded-md">
                Previous
            </PaginationPrevious>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
            </PaginationContent>
            <PaginationNext className="bg-[#a989f6] hover:bg-[#926fe6] text-white font-semibold px-4 py-2 rounded-md">
                Next
            </PaginationNext>
        </Pagination>
    );
}   