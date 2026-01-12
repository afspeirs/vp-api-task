import axios, { type AxiosResponse } from 'axios';

import type { ApiResponse } from './types';

export const sortOptions = [
  { name: 'Recommended', value: 1 },
  { name: 'Price: Low to High', value: 2 },
  { name: 'Price: High to Low', value: 3 },
  { name: 'Largest Discount', value: 4 },
] as const;

export type SortValue = typeof sortOptions[number]['value'];

type FacetFilterValue = {
  facetId: string,
  identifier: string,
  value: any,
};
export type FacetFilter = Record<string, FacetFilterValue>;
export type FacetFilters = Record<string, FacetFilterValue[]>;

type GetDataProps = {
  query?: string, // ideally this would be possible slugs and not just string
  pageNumber?: number,
  size?: number,
  additionalPages?: number,
  sort?: SortValue,
  facets?: FacetFilters,
};

export async function getData({
  query = 'bathroom-furniture',
  pageNumber = 0,
  size = 30,
  additionalPages = 0,
  sort = 1,
  facets,
}: GetDataProps) {
  const response: AxiosResponse<ApiResponse> = await axios.post(import.meta.env.VITE_API_URL, {
    query,
    pageNumber,
    size,
    additionalPages,
    sort,
    ...(facets && { facets }),
  });
  console.log('response.data', response.data);
  return response.data;
}
