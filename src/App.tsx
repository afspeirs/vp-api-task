import { Pagination } from './components/Pagination';
import { ProductFilter } from './components/ProductFilter';
import { ProductGrid } from './components/ProductGrid';
import { SkeletonGrid } from './components/SkeletonGrid';
import { useProductListing } from './hooks/useProductListing';

export function App() {
  const {
    products,
    pagination,
    facets,
    activeFilters,
    pageNumber,
    sortOption,
    isFetching,
    isPending,
    isError,
    error,
    setPageNumber,
    setSortOption,
    handleFilterChange,
    handleClearAll
  } = useProductListing(20);

  if (isError && error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <ProductFilter
          facets={facets}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          onSortChange={setSortOption}
          currentSort={sortOption}
        />
      </header>

      <div className="self-center w-full max-w-7xl flex-1 px-4 py-8">
        {(isFetching || isPending) ? (
           <SkeletonGrid />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      <footer className="bg-white border-t border-gray-200">
        {pagination && (
          <Pagination
            pageNumber={pageNumber}
            pagination={pagination}
            setPageNumber={setPageNumber}
          />
        )}
      </footer>
    </main>
  );
}
