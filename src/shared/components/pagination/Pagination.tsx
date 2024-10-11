import { Button } from "@/components/ui/button";
import {
  Pagination as PaginationLib,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}): JSX.Element => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <PaginationLib>
      {/* <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent> */}
      {/* <div className="flex space-x-2"> */}
      <PaginationContent /* className="flex space-x-2" */>
        <PaginationItem>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {/* Anterior */}
            <> {"<"} </>

            {/* <PaginationPrevious href="#" /> */}
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            variant={currentPage === index + 1 ? "default" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
        <PaginationItem>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {/* <PaginationNext href="#" /> */}
            {/* Siguiente */}
            <> {">"} </>
          </Button>
        </PaginationItem>
      </PaginationContent>
      {/* </div> */}
    </PaginationLib>
  );
};
