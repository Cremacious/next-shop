import prisma from '../prisma';

export async function getProducts() {
  const products = await prisma.product.findMany();
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    if (!product) throw new Error('Product not found');
    return {
      ...product,
      price: Number(product.price),
      rating: Number(product.rating),
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
}
