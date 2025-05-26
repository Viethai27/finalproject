import Variation from "../models/Variation.model.js";

export const getVariations = async (req, res) => {
  try {
    const variations = await Variation.find({});
    res.status(200).json({ success: true, data: variations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createVariation = async (req, res) => {
  try {
    const { name } = req.body;
    const variation = new Variation({ name });
    await variation.save();
    res.status(201).json({ success: true, data: variation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
