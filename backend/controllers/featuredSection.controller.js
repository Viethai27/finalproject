import FeaturedSection from "../models/FeaturedSection.model.js";

// ✅ Tạo mới hoặc lấy FeaturedSection theo categoryId
export const getOrCreateFeaturedSectionByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    let section = await FeaturedSection.findOne({ categoryId });
    if (!section) {
      section = await FeaturedSection.create({ categoryId });
    }

    res.status(200).json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ message: "Error getting or creating section", error: err.message });
  }
};

// ✅ Lấy tất cả featured sections
export const getAllFeaturedSections = async (req, res) => {
  try {
    const sections = await FeaturedSection.find().populate("categoryId");
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// ✅ Xóa một featured section
export const deleteFeaturedSection = async (req, res) => {
  try {
    const { id } = req.params;
    await FeaturedSection.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

export const getFeaturedSectionByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const section = await FeaturedSection.findOne({ categoryId }).populate('categoryId');

    if (!section) {
      return res.status(404).json({ message: 'Featured section not found for this category' });
    }

    res.json(section);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch featured section', error: err.message });
  }
};
