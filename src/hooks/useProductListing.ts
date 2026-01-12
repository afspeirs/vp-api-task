import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getData, type SortValue, type FacetFilter } from '../api/getData';
import type { ResponseFacet } from '../api/types';

export function useProductListing(initialSize = 20) {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState<SortValue>(1);
  const [activeFilters, setActiveFilters] = useState<FacetFilter>({});
  const [masterFacets, setMasterFacets] = useState<ResponseFacet[]>([]);

  const {
    data,
    isFetching,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', pageNumber, sortOption, activeFilters],
    queryFn: () => getData({
      pageNumber,
      size: initialSize,
      sort: sortOption,
      activeFilters,
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
      const apiFacet = data?.facets?.find((f) => f.identifier === masterFacet.identifier);
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
    setPageNumber(0);
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setPageNumber(0);
  };

  return {
    products: data?.products || [],
    pagination: data?.pagination,
    facets: facetsAll,
    activeFilters,

    isFetching,
    isPending,
    isError,
    error,

    pageNumber,
    setPageNumber,
    sortOption,
    setSortOption,

    handleFilterChange,
    handleClearAll
  };
}
