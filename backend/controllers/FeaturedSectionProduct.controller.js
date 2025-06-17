import FeaturedSectionProduct from "../models/FeaturedSectionProduct.model.js";

// ✅ Thêm sản phẩm vào FeaturedSection
export const addProductToFeaturedSection = async (req, res) => {
  try {
    const { featuredSectionId, productId, startDate, endDate } = req.body;

    if (!featuredSectionId || !productId || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const entry = await FeaturedSectionProduct.create({
      featuredSectionId,
      productId,
      startDate,
      endDate,
    });

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ message: "Add failed", error: err.message });
  }
};

// ✅ Lấy danh sách sản phẩm trong 1 featured section
export const getProductsInFeaturedSection = async (req, res) => {
  try {
    const { featuredSectionId } = req.params;
    if (!featuredSectionId) {
      return res.status(400).json({ message: "featuredSectionId is required" });
    }

    const products = await FeaturedSectionProduct.find({ featuredSectionId }).populate("productId");
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// ✅ Xóa 1 bản ghi FeaturedSectionProduct
export const deleteProductFromFeaturedSection = async (req, res) => {
  try {
    const { id } = req.params;
    await FeaturedSectionProduct.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
