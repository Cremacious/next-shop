import { getProductBySlug } from '@/lib/actions/product.actions';
import ProductDetails from './product-details';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  return <ProductDetails product={product} />;
}
