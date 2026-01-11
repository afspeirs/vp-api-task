import type { ResponseProduct } from '../api/types'

type CardProps = {
  product: ResponseProduct,
}

export function Card({
  product,
}: CardProps) {
  return (
    <li className="flex flex-col w-54 text-sm bg-white hover:shadow-lg transition-shadow overflow-hidden">
      <div className="w-full aspect-square overflow-hidden">
        <img
          className="object-contain size-full"
          src={`${product.image.url}?w=216`}
          alt={product.image?.attributes?.imageAltText || ''}
        />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-2">
        <span className='line-clamp-3 text-md'>{product.productName}</span>
        <div className="mt-auto">
          <div className="inline-block bg-amber-400 px-2 py-1 rounded-2xl">
            <span className="sr-only">Rated </span> {product.averageRating} <span className="sr-only"> out of 5</span>
          </div>
        </div>
      </div>
    </li>
  )
}
