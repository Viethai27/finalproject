import BaseController from "./BaseController.controller.js";
import Category from "../models/Category.model.js";
import FeaturedSection from "../models/FeaturedSection.model.js";

const {
  getAll: getCategories,
  update: updateCategory
} = BaseController(Category);

const specialSections = ["Featured", "Popular this month", "Newest"];

const toSlug = (str) =>
  str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const createCategory = async (req, res) => {
  try {
    const { parent, name } = req.body;

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (specialSections.includes(parentCategory?.name)) {
        return res.status(400).json({ success: false, message: "Cannot set special categories as parent." });
      }
    }

    const slug = toSlug(name);
    req.body.slug = slug;

    const category = new Category(req.body);
    const savedCategory = await category.save();

    if (!category.parent) {
      for (const name of specialSections) {
        const childCategory = await Category.create({
          name,
          parent: savedCategory._id,
          isSpecial: true,
          displayName: name.toUpperCase(),
          slug: toSlug(name)
        });

        if (name === "Featured") {
          await FeaturedSection.create({
            categoryId: savedCategory._id
          });
        }
      }
    }

    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoriesByParent = async (req, res) => {
  try {
    const { parent } = req.query;
    const query = parent ? { parent } : {};
    const categories = await Category.find(query);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoryTreeByParent = async (req, res) => {
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

const getRootCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null });
    const filtered = categories.filter(cat => !specialSections.includes(cat.name));
    res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
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

const getFullCategoryTree = async (req, res) => {
  try {
    const roots = await Category.find({ parent: null });

    const tree = await Promise.all(
      roots.map(async (root) => {
        const level2 = await Category.find({ parent: root._id });

        const level2WithChildren = await Promise.all(
          level2.map(async (lvl2) => {
            const level3 = await Category.find({ parent: lvl2._id });
            return {
              ...lvl2.toObject(),
              children: level3
            };
          })
        );

        return {
          ...root.toObject(),
          children: level2WithChildren
        };
      })
    );

    res.status(200).json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
  getFullCategoryTree,
  getCategories,
  updateCategory,
  createCategory,
  getCategoriesByParent,
  getCategoryTreeByParent,
  getRootCategories,
  deleteCategory,
  getCategoryById
};
