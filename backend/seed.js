const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './.env') });

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    foodType: { type: String, enum: ['Veg', 'Non-Veg', 'Both'], default: 'Veg' }
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);

const menuItems = [
    {
        name: "Classic Heritage Thali",
        description: "A royal arrangement of seasonal curries, slow-cooked lentils, fragrant basmati rice, and handmade artisanal rotis. Served with a side of cooling raita and house-made pickle.",
        price: 349,
        category: "Thali",
        image: "/images/menu/veg-thali.png",
        foodType: "Veg"
    },
    {
        name: "Lucknowi Chicken Curry",
        description: "Tender chicken pieces simmered in a rich, aromatic gravy of caramelized onions, ginger juliennes, and a secret blend of Awadhi spices. A true masterpiece of North Indian cuisine.",
        price: 499,
        category: "Non-Veg Specialty",
        image: "/images/menu/chicken-curry.png",
        foodType: "Non-Veg"
    },
    {
        name: "Velvety Paneer Lababdar",
        description: "Boutique paneer cubes tossed in a creamy, buttery tomato reduction with a hint of smoky cardamom and garnished with fresh organic cilantro.",
        price: 399,
        category: "Premium Veg",
        image: "/images/menu/paneer-butter-masala.png",
        foodType: "Veg"
    },
    {
        name: "Banana Leaf Grand Meal",
        description: "An authentic South Indian feast featuring 12 curated traditional items, from tangy tamarind rasam to creamy payasam. A symphony of flavors on a fresh green leaf.",
        price: 449,
        category: "Regional",
        image: "/images/menu/south-indian-meals.png",
        foodType: "Veg"
    },
    {
        name: "Artisanal Masala Chaas",
        description: "Hand-churned buttermilk infused with roasted cumin, garden-fresh coriander, and a touch of black salt. The perfect refreshing companion to any lunch.",
        price: 99,
        category: "Beverage",
        image: "/images/menu/buttermilk.png",
        foodType: "Veg"
    }
];

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) throw new Error("MONGODB_URI not found");

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB for seeding...");

        await MenuItem.deleteMany({});
        console.log("Cleared existing menu items.");

        await MenuItem.insertMany(menuItems);
        console.log("Successfully seeded premium menu items.");

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
