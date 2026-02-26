import mongoose from "mongoose";
import { MenuItem } from "./models/MenuItem";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import path from "path";


const menuItems = [
    {
        name: "Classic Veg Thali",
        description: "Rice, Dal, 2 Sabzi, Roti, Curd, Pickles",
        price: 120,
        category: "Thali",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
        isActive: true,
        foodType: "Veg",
    },
    {
        name: "Special Chicken Thali",
        description: "Chicken Curry, Rice, 1 Sabzi, Roti, Salad",
        price: 180,
        category: "Thali",
        image: "https://images.unsplash.com/photo-1626777559315-b0075f7b4476?auto=format&fit=crop&q=80&w=800",
        isActive: true,
        foodType: "Non-Veg",
    },
    {
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato gravy",
        price: 150,
        category: "Curry",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
        isActive: true,
        foodType: "Veg",
    },
    {
        name: "Hyderabadi Biryani",
        description: "Fragrant basmati rice with aromatic spices",
        price: 200,
        category: "Rice",
        image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800",
        isActive: true,
        foodType: "Non-Veg",
    },
];

async function seed() {
    try {
        await connectDb();
        console.log("Connected to MongoDB for seeding...");

        await MenuItem.deleteMany({});
        console.log("Cleared existing menu items.");

        await MenuItem.insertMany(menuItems);
        console.log("Seeded menu items successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seed();
