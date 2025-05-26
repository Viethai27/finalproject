import FeaturedSection from "../models/FeaturedSection.model.js";

export const createFeaturedSection = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const section = await FeaturedSection.create({ categoryId });
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

export const getAllFeaturedSections = async (req, res) => {
  try {
    const sections = await FeaturedSection.find().populate("categoryId");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

export const deleteFeaturedSection = async (req, res) => {
  try {
    const { id } = req.params;
    await FeaturedSection.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};