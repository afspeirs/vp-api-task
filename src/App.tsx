import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getData } from './api/getData';
import { Card } from './components/Card';
import { Pagination } from './components/Pagination';

// TODO: move this into the UI
const size = 20;

function App() {
  const [pageNumber, setPageNumber] = useState(176);
  // console.log('pageNumber', pageNumber);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['test-api', pageNumber],
    queryFn: () => getData({
      pageNumber,
      size,
    }),
  });

  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <main className="grid grid-rows-[1fr_auto] h-dvh">
      <ul className="flex justify-center gap-4 flex-wrap p-4 flex-1 overflow-auto">
        {data.products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </ul>
      <Pagination
        pageNumber={pageNumber}
        pagination={data.pagination}
        setPageNumber={setPageNumber}
      />
    </main>
  );
}

export default App;
