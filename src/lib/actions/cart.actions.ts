'use server';

import prisma from '../prisma';
import { cookies } from 'next/headers';
import { getAuthenticatedUser } from '../server-utils';
import { CartItemType } from '../types/cart.type';
import { convertToPlainObject } from '../utils';

export async function addItemToCartServer(item: CartItemType) {
  try {
    const { user } = await getAuthenticatedUser();

    const product = await prisma.product.findUnique({ where: { id: item.id } });
    if (!product || product.stock < (item.quantity || 1))
      throw new Error('Out of stock');

    if (user) {
      const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
      const items: CartItemType[] =
        cart && Array.isArray(cart.items) ? (cart.items as CartItemType[]) : [];

      const idx = items.findIndex(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (idx > -1) {
        items[idx].quantity = Math.min(
          items[idx].quantity + (item.quantity || 1),
          product.stock
        );
      } else {
        items.push({ ...item, quantity: 1 });
      }

      await prisma.cart.upsert({
        where: cart ? { id: cart.id } : { id: '' },
        update: { items: convertToPlainObject(items) },
        create: {
          userId: user.id,
          items: convertToPlainObject(items),
          itemsPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      });
    } else {
      const cookiesStore = await cookies();
      const cartCookie = cookiesStore.get('cart')?.value;
      const items: CartItemType[] = cartCookie ? JSON.parse(cartCookie) : [];
      const idx = items.findIndex(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (idx > -1) {
        items[idx].quantity = Math.min(
          items[idx].quantity + (item.quantity || 1),
          product.stock
        );
      } else {
        items.push({ ...item, quantity: 1 });
      }
      (await cookies()).set('cart', JSON.stringify(items), { httpOnly: true });
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
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

export async function updateItemQuantityServer(
  id: string,
  color: string,
  size: string,
  quantity: number
) {
  const { user } = await getAuthenticatedUser();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.stock < quantity) throw new Error('Out of stock');

  if (user) {
    const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
    const items: CartItemType[] =
      cart && Array.isArray(cart.items) ? (cart.items as CartItemType[]) : [];
    const idx = items.findIndex(
      (i) => i.id === id && i.color === color && i.size === size
    );
    if (idx > -1) {
      items[idx].quantity = quantity;
      if (cart) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { items: convertToPlainObject(items) },
        });
      }
    }
  } else {
    const cookiesStore = await cookies();
    const cartCookie = cookiesStore.get('cart')?.value;
    const items: CartItemType[] = cartCookie ? JSON.parse(cartCookie) : [];
    const idx = items.findIndex(
      (i) => i.id === id && i.color === color && i.size === size
    );
    if (idx > -1) {
      items[idx].quantity = quantity;
      cookiesStore.set('cart', JSON.stringify(items), { httpOnly: true });
    }
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
