import { getProductBySlug } from '@/lib/actions/product.actions';
import ProductDetails from './product-details';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex min-h-screen  bg-gray-50">
      <ProductDetails product={product} />
    </div>
  );
}
