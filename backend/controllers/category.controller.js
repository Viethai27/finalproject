import BaseController from "./BaseController.controller.js";
import Category from "../models/Category.model.js";

export const {
  getAll: getCategories,
  create: createCategory,
  update: updateCategory
} = BaseController(Category);

export const getCategoriesByParent = async (req, res) => {
  try {
    const { parent } = req.query;
    const query = parent ? { parent } : {};
    const categories = await Category.find(query);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryTreeByParent = async (req, res) => {
  try {
    const { parent } = req.query;
    if (!parent) {
      return res.status(400).json({ success: false, message: "Missing parent category ID" });
    }

    const level2Categories = await Category.find({ parent });

    const categoryTree = await Promise.all(
      level2Categories.map(async (level2) => {
        const level3Categories = await Category.find({ parent: level2._id });
        return {
          ...level2.toObject(),
          children: level3Categories,
        };
      })
    );

    res.status(200).json({ success: true, data: categoryTree });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRootCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCategoryAndChildren = async (categoryId) => {
      const children = await Category.find({ parent: categoryId });

      for (const child of children) {
        await deleteCategoryAndChildren(child._id);
      }

      await Category.findByIdAndDelete(categoryId);
    };

    await deleteCategoryAndChildren(id);

    res.status(200).json({ success: true, message: "Category and children deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};

