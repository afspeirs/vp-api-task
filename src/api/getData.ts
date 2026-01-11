import axios, { type AxiosResponse } from 'axios';

import type { ApiResponse } from './types';

export async function getData() {
  const response: AxiosResponse<ApiResponse> = await axios.post(import.meta.env.VITE_API_URL, {
    query: 'bathroom-furniture',
    sort: 1,
  });
  console.log(response.data);
  return response.data;
}
