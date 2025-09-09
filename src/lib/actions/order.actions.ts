'use server';

import prisma from '../prisma';
import { getAuthenticatedUser } from '../server-utils';
import { getCartForOrder } from './cart.actions';

// export async function createOrder() {
//   try {
//     const { user } = await getAuthenticatedUser();
//     if (!user) throw new Error('User not authenticated');
//     const cart = await getCartForOrder();
//     if (!cart || !cart.items || cart.items.length === 0)
//       throw new Error('Cart is empty');

//     const itemsPrice = cart.items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await prisma.order.create({
//       data: {
//         userId: user.id,
//         itemsPrice,
//         shippingAddress: '',
//         paymentMethod: '',
//         taxPrice: cart.taxPrice || 0,
//         totalPrice: cart.totalPrice || 0,
//         orderItems: {
//           create: cart.items.map((item) => ({
//             productId: item.id,
//             name: item.name,
//             price: item.price,
//             color: item.color,
//             size: item.size,
//             quantity: item.quantity,
//             image: item.image || '',
//           })),
//         },
//       },
//       include: {
//         orderItems: true,
//       },
//     });

//     return {
//       ...order,
//       itemsPrice: Number(order.itemsPrice),
//       taxPrice: Number(order.taxPrice),
//       totalPrice: Number(order.totalPrice),
//       orderItems: order.orderItems.map((item) => ({
//         ...item,
//         price: Number(item.price),
//       })),
//     };
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw new Error('Failed to create order');
//   }
// }

export async function createOrUpdatePendingOrder() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('User not authenticated');
    const cart = await getCartForOrder();
    if (!cart || !cart.items || cart.items.length === 0)
      throw new Error('Cart is empty');

    const itemsPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: 'pending',
      },
      include: { orderItems: true },
    });

    if (existingOrder) {
      await prisma.orderItem.deleteMany({
        where: { orderId: existingOrder.id },
      });

      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          itemsPrice,
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
        include: { orderItems: true },
      });

      return {
        ...updatedOrder,
        itemsPrice: Number(updatedOrder.itemsPrice),
        taxPrice: Number(updatedOrder.taxPrice),
        totalPrice: Number(updatedOrder.totalPrice),
        orderItems: updatedOrder.orderItems.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      };
    } else {
      const newOrder = await prisma.order.create({
        data: {
          userId: user.id,
          itemsPrice,
          shippingAddress: '',
          paymentMethod: '',
          taxPrice: cart.taxPrice || 0,
          totalPrice: cart.totalPrice || 0,
          status: 'pending',
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
        include: { orderItems: true },
      });

      return {
        ...newOrder,
        itemsPrice: Number(newOrder.itemsPrice),
        taxPrice: Number(newOrder.taxPrice),
        totalPrice: Number(newOrder.totalPrice),
        orderItems: newOrder.orderItems.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      };
    }
  } catch (error) {
    console.error('Error creating/updating order:', error);
    throw new Error('Failed to create or update order');
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('User not authenticated');

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

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
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
}

export async function updateOrderAddress(orderId: string, address: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('User not authenticated');

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
        status: 'pending',
      },
    });

    if (!order) throw new Error('Order not found');

    await prisma.order.update({
      where: { id: orderId },
      data: { shippingAddress: address },
    });

    return { status: 'success', message: 'Address updated' };
  } catch (error) {
    console.error('Error updating order address:', error);
    throw new Error('Failed to update order address');
  }
}


