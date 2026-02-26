import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    customerName: string;
    rating: number;
    comment: string;
    isApproved: boolean;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true }, // Auto-approve for this demonstration
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
