import Product from '../models/Product.model.js';
import ProductCategory from '../models/ProductCategory.model.js';
import ProductImage from '../models/ProductImage.model.js';
import Category from '../models/Category.model.js';
import BaseController from './BaseController.controller.js';

const {
  getAll: getProducts,
  create: createProduct,
  update: updateProduct,
  remove: deleteProduct
} = BaseController(Product);

const createFullProduct = async (req, res) => {
  try {
    const { name, description, price, technology, categoryIds, imageUrls } = req.body;
    const product = await Product.create({ name, description, price, technology });
    if (Array.isArray(categoryIds)) {
      await Promise.all(
        categoryIds.map(category =>
          ProductCategory.create({ product: product._id, category })
        )
      );
    }

    if (Array.isArray(imageUrls)) {
      await Promise.all(
        imageUrls.map(imageUrl =>
          ProductImage.create({ product: product._id, imageUrl })
        )
      );
    }

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const allCategoryIds = [categoryId];
    const stack = [categoryId];

    while (stack.length) {
      const current = stack.pop();
      const children = await Category.find({ parent: current }).select('_id');
      for (const child of children) {
        allCategoryIds.push(child._id.toString());
        stack.push(child._id.toString());
      }
    }

    const prodCats = await ProductCategory.find({ category: { $in: allCategoryIds } }).populate('product');
    const products = prodCats.map(pc => pc.product);

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const getPopularThisMonth = async (req, res) => {
  try {
    const { rootCategoryId } = req.params;
    if (!rootCategoryId) {
      return res.status(400).json({ success: false, message: "Missing root category ID" });
    }

    const allCategoryIds = [rootCategoryId];
    const stack = [rootCategoryId];

    while (stack.length) {
      const current = stack.pop();
      const children = await Category.find({ parent: current }).select('_id');
      for (const child of children) {
        allCategoryIds.push(child._id.toString());
        stack.push(child._id.toString());
      }
    }

    const productCategories = await ProductCategory.find({
      category: { $in: allCategoryIds }
    }).populate('product');

    const products = productCategories
      .map(pc => pc.product)
      .filter(p => p != null && typeof p.totalSold === 'number');
    const sorted = products
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 11);

    res.status(200).json({ success: true, data: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNewestProductsByRootCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ success: false, message: "Missing categoryId" });
    }

    const allCategoryIds = [categoryId];
    const stack = [categoryId];

    while (stack.length) {
      const current = stack.pop();
      const children = await Category.find({ parent: current }).select('_id');
      for (const child of children) {
        allCategoryIds.push(child._id.toString());
        stack.push(child._id.toString());
      }
    }

    const prodCats = await ProductCategory.find({ category: { $in: allCategoryIds } })
      .populate({ path: 'product', options: { sort: { createdAt: -1 }, limit: 30 } });

    const products = prodCats.map(pc => pc.product).filter(Boolean);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createFullProduct,
  getProductsByCategory,
  getPopularThisMonth,
  getNewestProductsByRootCategory
};
 