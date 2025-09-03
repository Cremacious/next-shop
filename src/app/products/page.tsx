import ProductGrid from '@/components/products/product-grid';
import { getProducts } from '@/lib/actions/product.actions';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <ProductGrid products={products} />
    </div>
  );
}
