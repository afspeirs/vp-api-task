import { useQuery } from '@tanstack/react-query';

import { getData } from './api/getData';
import { Card } from './components/Card';

function App() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['test-api'],
    queryFn: () => getData({}),
  });

  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <>
      <ul className="flex justify-center gap-4 flex-wrap p-4">
        {data.products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

export default App;
