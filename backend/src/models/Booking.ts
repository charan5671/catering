import mongoose, { type InferSchemaType } from "mongoose";

export type FoodType = "veg" | "non-veg" | "both";
export type BookingStatus = "Pending" | "Confirmed" | "Completed";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, required: true, trim: true, lowercase: true },
    eventDate: { type: Date, required: true },
    eventAddress: { type: String, required: true, trim: true, maxlength: 1000 },
    numberOfPeople: { type: Number, required: true, min: 1, max: 10000 },
    foodType: { type: String, required: true, enum: ["veg", "non-veg", "both"] },
    dishIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true }],
    specialInstructions: { type: String, default: "", trim: true, maxlength: 2000 },
    status: { type: String, enum: ["Pending", "Confirmed", "Completed"], default: "Pending" },
    dedupeKey: { type: String, required: true },
  },
  { timestamps: true }
);

bookingSchema.index({ eventDate: 1, createdAt: -1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ dedupeKey: 1 }, { unique: true });

export type BookingDoc = InferSchemaType<typeof bookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Booking = mongoose.model("Booking", bookingSchema);

