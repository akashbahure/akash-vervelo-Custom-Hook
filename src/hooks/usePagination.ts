import { useState } from "react";

export const usePagination = (initialPage: number = 1, itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginate = <T,>(data: T[] = []) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPagesCount = (totalItems: number) => Math.ceil(totalItems / itemsPerPage);

  // Get page numbers to display (max 5 at a time)
  const getPageNumbers = (totalItems: number) => {
    const totalPages = totalPagesCount(totalItems);
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return { currentPage, setCurrentPage, paginate, totalPagesCount, getPageNumbers, itemsPerPage };
};
