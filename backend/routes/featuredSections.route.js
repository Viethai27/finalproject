import express from "express";
import {
  getOrCreateFeaturedSectionByCategory, // dùng hàm mới
  getAllFeaturedSections,
  deleteFeaturedSection,
  getFeaturedSectionByCategory
} from "../controllers/featuredSection.controller.js";

const router = express.Router();

// ✅ POST: tạo hoặc lấy FeaturedSection theo category
router.post("/by-category", getOrCreateFeaturedSectionByCategory);

// ✅ GET: lấy tất cả featured sections
router.get("/", getAllFeaturedSections);

// ✅ DELETE: xóa 1 featured section
router.delete("/:id", deleteFeaturedSection);
router.get('/by-category/:categoryId', getFeaturedSectionByCategory);

export default router;
