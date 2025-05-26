import mongoose from "mongoose";

const featuredSectionSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  createdAt: { type: Date, default: Date.now }
});

const FeaturedSection = mongoose.model("FeaturedSection", featuredSectionSchema);
export default FeaturedSection;
