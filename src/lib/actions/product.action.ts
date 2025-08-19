import prisma from '../prisma';

export async function getProducts() {
  const products = await prisma.product.findMany();
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
}