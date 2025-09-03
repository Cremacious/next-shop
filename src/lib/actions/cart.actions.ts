'use server';

import prisma from '../prisma';
import { cookies } from 'next/headers';
import { getAuthenticatedUser } from '../server-utils';
import { CartItemType } from '../types/cart.type';
import { convertToPlainObject } from '../utils';

// const calcItemsPrice = (items: CartItemType[]) => {
//   return items.reduce((total, item) => {
//     const itemTotal = item.price * item.quantity;
//     return total + itemTotal;
//   }, 0);
// };

export async function addItemToCartServer(cartItems: CartItemType[]) {
  try {
    const { user } = await getAuthenticatedUser();

    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });
      if (!product || product.stock < item.quantity) {
        throw new Error(`Product ${item.id} out of stock`);
      }
    }

    if (user) {
      const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
      await prisma.cart.upsert({
        where: cart ? { id: cart.id } : { id: '' },
        update: { items: convertToPlainObject(cartItems) },
        create: {
          userId: user.id,
          items: convertToPlainObject(cartItems),
          itemsPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      });
    } else {
      const cookiesStore = await cookies();
      cookiesStore.set('cart', JSON.stringify(cartItems), { httpOnly: true });
    }
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

export async function getUserCart() {
  const { user } = await getAuthenticatedUser();
  if (user) {
    const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
    return cart?.items || [];
  } else {
    const cartCookie = (await cookies()).get('cart')?.value;
    return cartCookie ? JSON.parse(cartCookie) : [];
  }
}

export async function updateItemQuantityServer(cartItems: CartItemType[]) {
  try {
    const { user } = await getAuthenticatedUser();
    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });
      if (!product || product.stock < item.quantity) {
        throw new Error(`Product ${item.id} out of stock`);
      }
    }

    if (user) {
      const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
      await prisma.cart.upsert({
        where: cart ? { id: cart.id } : { id: '' },
        update: { items: convertToPlainObject(cartItems) },
        create: {
          userId: user.id,
          items: convertToPlainObject(cartItems),
          itemsPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      });
    } else {
      const cookiesStore = await cookies();
      cookiesStore.set('cart', JSON.stringify(cartItems), { httpOnly: true });
    }
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

export async function mergeGuestCartToUserCart() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) return;

    const cookiesStore = await cookies();
    const cartCookie = cookiesStore.get('cart')?.value;
    if (!cartCookie) return;
    const guestItems = JSON.parse(cartCookie);

    const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
    const userItems: CartItemType[] =
      cart && Array.isArray(cart.items) ? (cart.items as CartItemType[]) : [];

    for (const guestItem of guestItems) {
      const product = await prisma.product.findUnique({
        where: { id: guestItem.id },
      });
      if (!product) continue;
      const idx = userItems.findIndex(
        (i) =>
          i.id === guestItem.id &&
          i.color === guestItem.color &&
          i.size === guestItem.size
      );
      const maxQty = product.stock;
      if (idx > -1) {
        userItems[idx].quantity = Math.min(
          (userItems[idx].quantity || 0) + (guestItem.quantity || 1),
          maxQty
        );
      } else {
        userItems.push({
          ...guestItem,
          quantity: Math.min(guestItem.quantity || 1, maxQty),
        });
      }
    }

    await prisma.cart.upsert({
      where: cart ? { id: cart.id } : { id: '' },
      update: { items: convertToPlainObject(userItems) },
      create: {
        userId: user.id,
        items: convertToPlainObject(userItems),
        itemsPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      },
    });

    cookiesStore.set('cart', '', { httpOnly: true, maxAge: 0 });
  } catch (error) {
    console.error('Error merging guest cart to user cart:', error);
  }
}

export async function removeItemFromCartServer(cartItems: CartItemType[]) {
  try {
    const { user } = await getAuthenticatedUser();

    if (user) {
      const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
      await prisma.cart.upsert({
        where: cart ? { id: cart.id } : { id: '' },
        update: { items: convertToPlainObject(cartItems) },
        create: {
          userId: user.id,
          items: convertToPlainObject(cartItems),
          itemsPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      });
    } else {
      const cookiesStore = await cookies();
      cookiesStore.set('cart', JSON.stringify(cartItems), { httpOnly: true });
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
}
