import mongoose, { type InferSchemaType } from "mongoose";

export type MenuCategory = "veg" | "non-veg";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    foodType: { type: String, enum: ["Veg", "Non-Veg"], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuItemSchema.index({ category: 1, isActive: 1, createdAt: -1 });
menuItemSchema.index({ name: "text", description: "text" });

export type MenuItemDoc = InferSchemaType<typeof menuItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);

