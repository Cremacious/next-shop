'use server';

import prisma from '../prisma';
import { getAuthenticatedUser } from '../server-utils';
import { CartItemType } from '../types/cart.type';

export async function addItemToCartServer(data: CartItemType) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error('Not authenticated');

  const cart = await getUserCart();

  const product = await prisma.product.findUnique({
    where: { id: data.id },
  });
  if (!product) throw new Error('Product not found');
  
}

export async function getUserCart() {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Not authenticated');
  const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
  return cart?.items || [];
}
