import FeaturedSectionProduct from "../models/FeaturedSectionProduct.model.js";

export const addProductToFeaturedSection = async (req, res) => {
  try {
    const { featuredSectionId, productId, startDate, endDate } = req.body;
    const entry = await FeaturedSectionProduct.create({
      featuredSectionId,
      productId,
      startDate,
      endDate
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Add failed", error: err.message });
  }
};

export const getProductsInFeaturedSection = async (req, res) => {
  try {
    const { featuredSectionId } = req.params;
    const products = await FeaturedSectionProduct.find({ featuredSectionId })
      .populate("productId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

export const deleteProductFromFeaturedSection = async (req, res) => {
  try {
    const { id } = req.params;
    await FeaturedSectionProduct.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
