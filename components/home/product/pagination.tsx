// src/components/pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1 || isPending}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              onClick={() => handlePageChange(pageNum)}
              disabled={isPending}
            >
              {pageNum}
            </Button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="px-2">...</span>
        )}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <Button
            variant="outline"
            onClick={() => handlePageChange(totalPages)}
            disabled={isPending}
          >
            {totalPages}
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages || isPending}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {isPending && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
      </div>
    </div>
  );
}
