import express from 'express';
import Review from '../models/Review';
import { createReviewSchema } from '../schemas/reviewSchemas';

const router = express.Router();

// GET all approved reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, items: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST a new review
router.post('/', async (req, res) => {
    try {
        const validation = createReviewSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, errors: validation.error.errors });
        }

        const newReview = new Review(validation.data);
        await newReview.save();
        res.status(201).json({ success: true, item: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
