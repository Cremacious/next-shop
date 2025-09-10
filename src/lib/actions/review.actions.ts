'use server';
import prisma from '../prisma';
import { getAuthenticatedUser } from '../server-utils';
import { reviewSchema } from '../validators/review';
import { z } from 'zod';

export async function addReviewToProduct(
  productId: string,
  reviewData: z.infer<typeof reviewSchema>
) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('User not authenticated');

    const hasPurchased = await hasUserPurchasedProduct(user.id, productId);
    if (!hasPurchased) throw new Error('User has not purchased this product');
    const userReview = reviewSchema.parse(reviewData);

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    });
    if (existingReview) {
      throw new Error('User has already reviewed this product');
    }
    await prisma.review.create({
      data: {
        userId: user.id,
        productId,
        rating: userReview.rating,
        title: userReview.title,
        description: userReview.description,
      },
    });
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}

export async function hasUserPurchasedProduct(
  userId: string,
  productId: string
): Promise<boolean> {
  try {
    const order = await prisma.order.findFirst({
      where: {
        userId,
        status: {
          in: ['isCreated', 'completed'],
        },
        orderItems: {
          some: { productId },
        },
      },
    });
    return !!order;
  } catch (error) {
    console.error('Error checking if user has purchased product:', error);
    return false;
  }
}

export async function getProductReviews(productId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
      }
    });
    return reviews;
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw error;
  }
}

export async function getProductReviewStats(productId: string) {
  try {
    const stats = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return {
      rating: stats._avg.rating || 0,
      numReviews: stats._count.rating || 0,
    };
  } catch (error) {
    console.error('Error fetching review stats:', error);
    return { rating: 0, numReviews: 0 };
  }
}