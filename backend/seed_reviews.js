const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './.env') });

const ReviewSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

const initialReviews = [
    {
        customerName: "Anjali Verma",
        rating: 5,
        comment: "The Heritage Thali is a literal journey through India. So authentic and the service is impeccably professional.",
        isApproved: true
    },
    {
        customerName: "Sanjay Reddy",
        rating: 5,
        comment: "Finally, a lunch delivery that doesn't compromise on quality. The packaging is premium and the food is consistently amazing.",
        isApproved: true
    },
    {
        customerName: "Priya Das",
        rating: 4,
        comment: "Love the Chicken Curry! The spices are perfectly balanced. Great to see such high standards in lunch boxes.",
        isApproved: true
    }
];

const seedReviews = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) throw new Error("MONGODB_URI not found");

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB for seeding reviews...");

        await Review.deleteMany({});
        await Review.insertMany(initialReviews);
        console.log("Successfully seeded professional reviews.");

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Seeding reviews failed:", err);
        process.exit(1);
    }
};

seedReviews();
