import ProductGrid from '@/components/products/product-grid';
import { getProducts } from '@/lib/actions/product.action';


export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
}
