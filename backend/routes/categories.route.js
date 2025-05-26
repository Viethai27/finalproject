import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByParent,
  getCategoryTreeByParent,
  getRootCategories
} from "../controllers/category.controller.js";

const router = express.Router();

// CRUD routes
router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Custom query routes
router.get("/by-parent", getCategoriesByParent);
router.get("/tree-by-parent", getCategoryTreeByParent);
router.get("/roots", getRootCategories); 

export default router;
