// hooks/usePagination.ts
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const usePagination = (itemsPerPage: number) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const getPageFromUrl = useCallback(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState(getPageFromUrl());

  useEffect(() => {
    const page = getPageFromUrl();
    setCurrentPage(page);
  }, [getPageFromUrl]);

  const handlePageChange = useCallback((page: number) => {
    router.push(`?page=${page}`);
  }, [router]);

  const calculatePagination = useCallback((totalItems: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    
    return {
      totalPages,
      indexOfFirst,
      indexOfLast
    };
  }, [currentPage, itemsPerPage]);

  return {
    currentPage,
    handlePageChange,
    calculatePagination,
    getPageFromUrl
  };
};