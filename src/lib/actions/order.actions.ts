'use server';

import prisma from '../prisma';
import { getAuthenticatedUser } from '../server-utils';
import { getCartForOrder } from './cart.actions';

export async function createOrder() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('User not authenticated');
    const cart = await getCartForOrder();
    if (!cart || !cart.items || cart.items.length === 0)
      throw new Error('Cart is empty');

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        itemsPrice: cart.itemsPrice,
        shippingAddress: '',
        paymentMethod: '',
        taxPrice: cart.taxPrice || 0,
        totalPrice: cart.totalPrice || 0,
        orderItems: {
          create: cart.items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            image: item.image || '',
          })),
        },
      },
      include: {
        orderItems: true, 
      },
    });

    return {
      ...order,
      itemsPrice: Number(order.itemsPrice),
      taxPrice: Number(order.taxPrice),
      totalPrice: Number(order.totalPrice),
      orderItems: order.orderItems.map((item) => ({
        ...item,
        price: Number(item.price),
      })),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}
