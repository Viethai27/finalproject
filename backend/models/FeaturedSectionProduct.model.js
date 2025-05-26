import mongoose from "mongoose";

const featuredSectionProductSchema = new mongoose.Schema({
  featuredSectionId: { type: mongoose.Schema.Types.ObjectId, ref: "FeaturedSection", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const FeaturedSectionProduct = mongoose.model("FeaturedSectionProduct", featuredSectionProductSchema);
export default FeaturedSectionProduct;