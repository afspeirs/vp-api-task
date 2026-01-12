import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getData, type SortValue } from './api/getData';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
import { ProductSort } from './components/ProductSort';

// TODO: move this into the UI
const size = 20;

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState<SortValue>(1);
  // console.log('pageNumber', pageNumber);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['test-api', pageNumber, sortOption],
    queryFn: () => getData({
      pageNumber,
      size,
      sort: sortOption,
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
      <aside>
        {/* <ProductFilter /> */}
        <ProductSort
          setSortOption={setSortOption}
        />
      </aside>
      <ProductGrid products={data.products} />
      <Pagination
        pageNumber={pageNumber}
        pagination={data.pagination}
        setPageNumber={setPageNumber}
      />
    </main>
  );
}

export default App;
