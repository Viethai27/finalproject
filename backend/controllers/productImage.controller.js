import ProductImage from "../models/ProductImage.model.js";
import mongoose from "mongoose";

export const getProductImages = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    // Mongoose tự động convert string productId thành ObjectId khi query trường ObjectId
    const images = await ProductImage.find({ product: productId });

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const addProductImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const image = new ProductImage({ product: req.params.productId, imageUrl });
    await image.save();
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    await ProductImage.findByIdAndDelete(imageId);
    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
