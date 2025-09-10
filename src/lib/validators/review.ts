import {z} from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1),
  title: z.string().min(1),
  description: z.string(),
});