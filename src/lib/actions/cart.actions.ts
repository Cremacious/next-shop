'use server';

import prisma from '../prisma';
import { cookies } from 'next/headers';
import { getAuthenticatedUser } from '../server-utils';
import { CartItemType } from '../types/cart.type';
import { convertToPlainObject } from '../utils';

export async function addItemToCart(item: CartItemType) {
  try {
    console.log('Adding item to cart:', item);
    const { user } = await getAuthenticatedUser();

    // Fetch product and check stock
    const product = await prisma.product.findUnique({ where: { id: item.id } });
    if (!product || product.stock < (item.quantity || 1))
      throw new Error('Out of stock');

    if (user) {
      // Authenticated: update DB cart
      const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
      const items: CartItemType[] =
        cart && Array.isArray(cart.items) ? (cart.items as CartItemType[]) : [];
      // Find item in cart
      const idx = items.findIndex(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (idx > -1) {
        // Increase quantity, check stock
        items[idx].quantity = Math.min(
          items[idx].quantity + (item.quantity || 1),
          product.stock
        );
      } else {
        items.push({ ...item, quantity: 1 });
      }

      await prisma.cart.upsert({
        where: cart ? { id: cart.id } : { id: '' }, // Use cart.id if cart exists, else provide an empty string (will trigger create)
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

export async function updateItemQuantity(
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
    const items: CartItemType[] = cart && Array.isArray(cart.items) ? (cart.items as CartItemType[]) : [];
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

// export async function mergeGuestCartToUserCart() {
//   const { user } = await getAuthenticatedUser();
//   if (!user) return;

//   const cookiesStore = await cookies();
//   const cartCookie = cookiesStore.get('cart')?.value;
//   if (!cartCookie) return;
//   const guestItems = JSON.parse(cartCookie);

//   // Fetch user's cart from DB
//   const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
//   let userItems = cart && Array.isArray(cart.items) ? cart.items : [];

//   // Merge logic
//   for (const guestItem of guestItems) {
//     // Fetch product to check stock
//     const product = await prisma.product.findUnique({
//       where: { id: guestItem.id },
//     });
//     if (!product) continue;
//     const idx = userItems.findIndex(
//       (i) =>
//         i.id === guestItem.id &&
//         i.color === guestItem.color &&
//         i.size === guestItem.size
//     );
//     const maxQty = product.stock;
//     if (idx > -1) {
//       // Increase quantity, but do not exceed stock
//       userItems[idx].quantity = Math.min(
//         (userItems[idx].quantity || 0) + (guestItem.quantity || 1),
//         maxQty
//       );
//     } else {
//       userItems.push({
//         ...guestItem,
//         quantity: Math.min(guestItem.quantity || 1, maxQty),
//       });
//     }
//   }

//   // Save merged cart to DB
//   await prisma.cart.upsert({
//     where: cart ? { id: cart.id } : { id: '' },
//     update: { items: convertToPlainObject(userItems) },
//     create: {
//       userId: user.id,
//       items: convertToPlainObject(userItems),
//       itemsPrice: 0,
//       taxPrice: 0,
//       totalPrice: 0,
//     },
//   });

//   // Clear guest cart cookie
//   cookiesStore.set('cart', '', { httpOnly: true, maxAge: 0 });
// }
