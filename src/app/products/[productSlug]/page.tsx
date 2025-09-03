import { getProductBySlug } from '@/lib/actions/product.actions';
import ProductDetails from './product-details';
import ProductReviews from './product-reviews';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen  bg-gray-50">
      <ProductDetails product={product} />
      <ProductReviews />
    </div>
  );
}
