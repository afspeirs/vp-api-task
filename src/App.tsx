import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';
import type { ApiResponse } from './api/types';

async function getApiData() {
  const response: AxiosResponse<ApiResponse> = await axios.post(import.meta.env.VITE_API_URL, {
    query: 'bathroom-furniture',
    sort: 1,
  });
  console.log(response.data);
  return response.data;
}

function App() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['test-api'],
    queryFn: getApiData,
  });

  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <ul>
      {data.products.map((product) => (
        <li key={product.id}>{product.productName}</li>
      ))}
    </ul>
  );
}

export default App;
