import { getProductBySlug } from '@/lib/actions/product.actions';
import ProductDetails from './product-details';
import { getUserCart } from '@/lib/actions/cart.actions';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  const cartItems = await getUserCart();

  return <ProductDetails product={product} cartItems={cartItems} />;
}
