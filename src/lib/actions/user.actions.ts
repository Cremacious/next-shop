'use server';
import { getAuthenticatedUser } from '../server-utils';
import prisma from '../prisma';
import { shippingAddressType } from '../types/user.type';

export async function saveShippingAddress({
  address,
}: {
  address: shippingAddressType;
}) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('No authenticated user');
    await prisma.user.update({
      where: { id: user?.id },
      data: { shippingAddress: address },
    });
  } catch (error) {
    console.log(error);
  }
}
