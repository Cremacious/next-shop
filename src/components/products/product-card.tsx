import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ProductType } from '@/lib/types/product.type';

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <div className="relative w-full h-48">
        <Image
          className="object-cover"
          sizes="100vw"
          fill
          src={product.images[0]}
          alt="Product Image"
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
          SALE
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price}</span>
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <Link href={`/products/${product.slug}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
