import type { ResponseProduct } from '../api/types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: ResponseProduct[],
}

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <ul className="flex justify-center gap-4 flex-wrap p-4 flex-1 overflow-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
