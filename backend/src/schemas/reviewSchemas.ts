import { z } from 'zod';

export const createReviewSchema = z.object({
    customerName: z.string().min(2, "Name must be at least 2 characters"),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters")
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
