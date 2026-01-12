import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getData, type FacetFilter, type SortValue } from './api/getData';
import type { ResponseFacet } from './api/types';
import { Pagination } from './components/Pagination';
import { ProductFilter } from './components/ProductFilter';
import { ProductGrid } from './components/ProductGrid';

// TODO: move this into the UI
const size = 20;

export function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState<SortValue>(1);
  const [activeFilters, setActiveFilters] = useState<FacetFilter>({});
  const [masterFacets, setMasterFacets] = useState<ResponseFacet[]>([]);

  const formatFacetsForApi = useCallback(() => {
    const filterEntries = Object.values(activeFilters);
    if (filterEntries.length === 0) return undefined;

    const formattedFacets: Record<string, any[]> = {};

    filterEntries.forEach((opt) => {
      if (!formattedFacets[opt.facetId]) {
        formattedFacets[opt.facetId] = [];
      }

      formattedFacets[opt.facetId].push({
        identifier: opt.identifier,
        value: opt.value,
      });
    });

    return formattedFacets;
  }, [activeFilters]);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', pageNumber, sortOption, activeFilters],
    queryFn: () => getData({
      pageNumber,
      size,
      sort: sortOption,
      facets: formatFacetsForApi(),
    }),
  });

  // Get the initial facets to compare against later
  useEffect(() => {
    if (data?.facets && Object.keys(activeFilters).length === 0 && masterFacets.length === 0) {
      setMasterFacets(data.facets);
    }
  }, [data, activeFilters, masterFacets]);

  // Merge the facets from the api and the masterFacets to stop facets disappearing in the frontend
  const facetsAll = useMemo(() => {
    if (masterFacets.length === 0) return data?.facets || [];

    return masterFacets.map((masterFacet) => {
      const apiFacet = data?.facets?.find((facet) => facet.identifier === masterFacet.identifier);

      return {
        ...masterFacet,
        options: masterFacet.options.map((masterOption) => {
          const apiOption = apiFacet?.options?.find(o => o.identifier === masterOption.identifier);
          return {
            ...masterOption,
            productCount: apiOption ? apiOption.productCount : 0
          };
        })
      };
    });
  }, [data, masterFacets]);

  const handleFilterChange = (facetId: string, option: any) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      if (next[option.identifier]) {
        delete next[option.identifier];
      } else {
        next[option.identifier] = { ...option, facetId };
      }
      return next;
    });
    setPageNumber(0); // Reset pagination on filter change
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setPageNumber(0);
  };

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <ProductFilter
          facets={facetsAll}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          onSortChange={setSortOption}
          currentSort={sortOption}
        />
      </header>

      <div className="flex-1 px-4 py-8">
        {isPending ? (
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-3/4 rounded" />
              ))}
           </div>
        ) : (
          <ProductGrid products={data.products} />
        )}
      </div>

      <footer className="bg-white border-t border-gray-200">
        {data?.pagination && (
          <Pagination
            pageNumber={pageNumber}
            pagination={data.pagination}
            setPageNumber={setPageNumber}
          />
        )}
      </footer>
    </main>
  );
}
