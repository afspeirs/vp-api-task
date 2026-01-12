import { Activity } from 'react';

import type { ResponseProduct } from '../api/types';

type ProductCardProps = {
  product: ResponseProduct,
}

const currencyCodeMapping: Record<string, string> = {
  EUR: '€',
  GBP: '£',
  USD: '$',
};

export function ProductCard({
  product,
}: ProductCardProps) {
  const isRated = (product?.averageRating ?? 0) > 0;

  return (
    <li className="relative flex flex-col w-54 text-sm bg-white hover:shadow-lg transition-shadow overflow-hidden">
      <div className="w-full aspect-square overflow-hidden">
        <img
          className="object-contain size-full"
          src={`${product.image.url}?w=216`}
          alt={product.image?.attributes?.imageAltText || ''}
        />
      </div>
      <div className="p-2 space-y-2">
        <span className='line-clamp-3 text-md'>{product.productName}</span>
        <span>{currencyCodeMapping[product.price.currencyCode]}{product.price.priceIncTax}</span>
      </div>
      <Activity mode={isRated ? 'visible' : 'hidden'}>
        <div className="absolute top-2 right-2 inline-block bg-amber-400 px-2 py-1 rounded-2xl">
          <span className="sr-only">Rated </span> {product.averageRating?.toFixed(1)} <span className="sr-only"> out of 5</span>
        </div>
      </Activity>
    </li>
  )
}
