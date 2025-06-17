import BaseController from "./BaseController.controller.js";
import Category from "../models/Category.model.js";
import FeaturedSection from "../models/FeaturedSection.model.js";

const {
  getAll: getCategories,
  update: updateCategory
} = BaseController(Category);

const specialSections = [
  { name: "Featured", specialType: "featured" },
  { name: "Popular this month", specialType: "popular" },
  { name: "Newest", specialType: "newest" }
];

const createCategory = async (req, res) => {
  try {
    let { parent, name } = req.body;

    if (!parent) parent = null;

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (specialSections.map(s => s.name).includes(parentCategory?.name)) {
        return res.status(400).json({ success: false, message: "Cannot set special categories as parent." });
      }
    }

    // Check xem category đã tồn tại chưa (tránh tạo trùng)
    const existing = await Category.findOne({ name, parent });
    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists." });
    }

    const category = new Category({
      name,
      parent,
      isSpecial: false,
      specialType: null
    });

    const savedCategory = await category.save();

    // Nếu là root category (parent là null), tạo 3 category đặc biệt con
    if (!parent) {
      for (const section of specialSections) {

        // Kiểm tra có tồn tại chưa (an toàn hơn nữa)
        const existingSpecial = await Category.findOne({
          name: section.name,
          parent: savedCategory._id,
          isSpecial: true,
          specialType: section.specialType
        });

        if (!existingSpecial) {
          await Category.create({
            name: section.name,
            parent: savedCategory._id,
            isSpecial: true,
            specialType: section.specialType
          });
        }

        if (section.name === "Featured") {
          // Kiểm tra FeaturedSection tồn tại chưa
          let featuredSection = await FeaturedSection.findOne({ categoryId: savedCategory._id });
          if (!featuredSection) {
            await FeaturedSection.create({ categoryId: savedCategory._id });
          }
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
      return res.status(400).json({ success: false, message: "Parent ID is required" });
    }

    const level2Categories = await Category.find({ parent });

    const categoryTree = await Promise.all(
      level2Categories.map(async (level2) => {
        const children = await Category.find({ parent: level2._id });
        return {
          ...level2.toObject(),
          children
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
    const categories = await Category.find({ parent: null, isSpecial: { $ne: true } });
    res.status(200).json({ success: true, data: categories });
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
    res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};

// Đệ quy xây dựng cây category nhiều cấp
const buildCategoryTree = async (parentId = null) => {
  const categories = await Category.find({ parent: parentId });
  return Promise.all(
    categories.map(async (cat) => ({
      ...cat.toObject(),
      children: await buildCategoryTree(cat._id)
    }))
  );
};

const getFullCategoryTree = async (req, res) => {
  try {
    const tree = await buildCategoryTree(null);
    res.status(200).json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API lấy riêng các category đặc biệt
const getSpecialCategories = async (req, res) => {
  try {
    const specialCategories = await Category.find({ isSpecial: true });
    res.status(200).json({ success: true, data: specialCategories });
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
  getCategoryById,
  getSpecialCategories
};
