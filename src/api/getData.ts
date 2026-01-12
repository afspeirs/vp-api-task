import axios, { type AxiosResponse } from 'axios';
import type { ApiResponse } from './types';

export const sortOptions = [
  { name: 'Recommended', value: 1 },
  { name: 'Price: Low to High', value: 2 },
  { name: 'Price: High to Low', value: 3 },
  { name: 'Largest Discount', value: 4 },
] as const;

export type SortValue = typeof sortOptions[number]['value'];

export type FacetFilterValue = {
  facetId: string,
  identifier: string,
  value: any,
};
export type FacetFilter = Record<string, FacetFilterValue>;

type GetDataProps = {
  query?: string,
  pageNumber?: number,
  size?: number,
  additionalPages?: number,
  sort?: SortValue,
  activeFilters?: FacetFilter, // Changed from 'facets' to the raw state
};

export async function getData({
  query = 'bathroom-furniture',
  pageNumber = 0,
  size = 30,
  additionalPages = 0,
  sort = 1,
  activeFilters,
}: GetDataProps) {
  const formattedFacets: Record<string, any[]> = {};

  if (activeFilters) {
    Object.values(activeFilters).forEach((opt) => {
      if (!formattedFacets[opt.facetId]) {
        formattedFacets[opt.facetId] = [];
      }
      formattedFacets[opt.facetId].push({
        identifier: opt.identifier,
        value: opt.value,
      });
    });
  }

  const response: AxiosResponse<ApiResponse> = await axios.post(import.meta.env.VITE_API_URL, {
    query,
    pageNumber,
    size,
    additionalPages,
    sort,
    // Only send facets if there are actually filters selected
    ...(Object.keys(formattedFacets).length > 0 && { facets: formattedFacets }),
  });

  // console.log('response.data', response.data);

  return response.data;
}
