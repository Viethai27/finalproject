import express from "express";
import {
  addProductToFeaturedSection,
  getProductsInFeaturedSection,
  deleteProductFromFeaturedSection
} from "../controllers/FeaturedSectionProduct.controller.js";

const router = express.Router();

router.post("/", addProductToFeaturedSection);
router.get("/:featuredSectionId", getProductsInFeaturedSection);
router.delete("/:id", deleteProductFromFeaturedSection);

export default router;
