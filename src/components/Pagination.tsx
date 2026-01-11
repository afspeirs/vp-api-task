import type { ResponsePagination } from '../api/types';

type PaginationProps = {
  pageNumber: number,
  pagination: ResponsePagination,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
}

export function Pagination({
  pageNumber,
  pagination,
  setPageNumber,
}: PaginationProps) {
  const numberOfPages = pagination ? Math.ceil(pagination.total / pagination.size) : -1;
  const start = (pageNumber * pagination.size);
  const end = (pageNumber === numberOfPages - 1 ? pagination.total - 1 : start + pagination.size - 1);

  const handlePreviousPage = () => setPageNumber((prevState) => Math.max(prevState - 1, 0));
  const handleNextPage = () => setPageNumber((prevState) => Math.min(prevState + 1, numberOfPages));

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-600 bg-white px-4 py-3 sm:px-6 select-none"
      aria-label="Pagination"
    >
      <p className="text-sm text-pretty text-gray-900">
        Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{end + 1}</span> of <span className="font-medium">{pagination.total}</span> results.
        (Page {pageNumber + 1}/{numberOfPages})
      </p>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={pageNumber === 0}
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold enabled:hover:bg-black/5 text-gray-900 not-disabled:cursor-pointer disabled:opacity-40 ring-1 ring-inset ring-gray-600 focus-outline"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          // disabled={end + 1 === pagination.total}
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold enabled:hover:bg-black/5 text-gray-900 not-disabled:cursor-pointer disabled:opacity-40 ring-1 ring-inset ring-gray-600 focus-outline"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
