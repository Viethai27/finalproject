import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByParent,
  getCategoryTreeByParent,
  getRootCategories,
  getFullCategoryTree,
  getCategoryBySlug
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/by-parent", getCategoriesByParent);
router.get("/tree-by-parent", getCategoryTreeByParent);
router.get("/roots", getRootCategories);
router.get("/tree", getFullCategoryTree);
router.get("/slug/:slug", getCategoryBySlug); // 👈 Route mới dùng slug

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
