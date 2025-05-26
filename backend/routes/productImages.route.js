import express from "express";
import {
  getProductImages,
  addProductImage,
  deleteProductImage
} from "../controllers/productImage.controller.js";

const router = express.Router();

router.get("/:productId/images", getProductImages);
router.post("/:productId/images", addProductImage);
router.delete("/:productId/images/:imageId", deleteProductImage);

export default router;
 