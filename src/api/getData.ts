import axios, { type AxiosResponse } from 'axios';

import type { ApiResponse } from './types';

export const sortMapping = {
  Recommended: 1,
  PriceLowToHigh: 2,
  PriceHighToLow: 3,
  LargestDiscount: 4,
} as const

export type SortValue = typeof sortMapping[keyof typeof sortMapping];

type GetDataProps = {
  query?: string, // ideally this would be possible slugs and not just string
  pageNumber?: number,
  size?: number,
  // additionalPages?: number,
  sort?: SortValue,
}

export async function getData({
  query = 'bathroom-furniture',
  pageNumber = 0,
  size = 30,
  // additionalPages = number,
  sort = 1,
}: GetDataProps) {
  const response: AxiosResponse<ApiResponse> = await axios.post(import.meta.env.VITE_API_URL, {
    query,
    pageNumber,
    size,
    // additionalPages,
    sort,
  });
  console.log('response.data', response.data);
  return response.data;
}
