import Product from '../models/Product.model.js';
import ProductCategory from '../models/ProductCategory.model.js';
import ProductImage from '../models/ProductImage.model.js';
import Category from '../models/Category.model.js';
import FeaturedSection from '../models/FeaturedSection.model.js';
import FeaturedSectionProduct from '../models/FeaturedSectionProduct.model.js';
import BaseController from './BaseController.controller.js';

const {
  getAll: getProducts,
  create: createProduct,
  update: updateProduct,
  remove: deleteProduct
} = BaseController(Product);

// ✅ Helper tìm root category
const findRootCategory = async (categoryId) => {
  let current = await Category.findById(categoryId);
  while (current?.parent) {
    current = await Category.findById(current.parent);
  }
  return current?._id;
};

// ✅ Helper lấy toàn bộ sub-category (đệ quy)
const getAllCategoryIds = async (rootId) => {
  const allCategoryIds = [rootId];
  const stack = [rootId];

  while (stack.length) {
    const current = stack.pop();
    const children = await Category.find({ parent: current }).select('_id');
    for (const child of children) {
      allCategoryIds.push(child._id.toString());
      stack.push(child._id.toString());
    }
  }
  return allCategoryIds;
};

// ✅ Helper attach images vào products
const attachImagesToProducts = async (products) => {
  return await Promise.all(
    products.map(async (product) => {
      const images = await ProductImage.find({ product: product._id });
      return { ...product.toObject(), images };
    })
  );
};

// ✅ Helper sắp xếp sản phẩm theo tham số
const sortProducts = (products, sort) => {
  if (!sort) return products;

  switch (sort) {
    case 'price_asc':
      return products.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return products.sort((a, b) => b.price - a.price);
    case 'sold_asc':
      return products.sort((a, b) => a.totalSold - b.totalSold);
    case 'sold_desc':
      return products.sort((a, b) => b.totalSold - a.totalSold);
    case 'newest':
      return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return products;
  }
};

// ✅ Helper lọc sản phẩm theo cây category (không bị sai)
const filterProductsByCategoryTree = (productCategories, allCategoryIds) => {
  const grouped = {};
  for (const pc of productCategories) {
    if (!pc.product) continue;
    const pid = pc.product._id.toString();
    if (!grouped[pid]) grouped[pid] = { product: pc.product, categories: [] };
    grouped[pid].categories.push(pc.category.toString());
  }

  return Object.values(grouped)
    .filter(p => p.categories.some(catId => allCategoryIds.includes(catId)))
    .map(p => p.product);
};

// ✅ Tạo full product
const createFullProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      technology,
      categoryIds,
      imageUrls,
      isFeatured,
      featuredStart,
      featuredEnd
    } = req.body;

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

    if (isFeatured && featuredStart && featuredEnd && categoryIds?.length > 0) {
      const rootCategoryId = await findRootCategory(categoryIds[0]);

      let section = await FeaturedSection.findOne({ categoryId: rootCategoryId });
      if (!section) {
        section = await FeaturedSection.create({ categoryId: rootCategoryId });
      }

      await FeaturedSectionProduct.create({
        featuredSectionId: section._id,
        productId: product._id,
        startDate: new Date(featuredStart),
        endDate: new Date(featuredEnd),
      });
    }

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Sửa lại: Lấy sản phẩm theo category (bao gồm children, lọc đúng)
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { sort } = req.query;

    const allCategoryIds = await getAllCategoryIds(categoryId);
    const prodCats = await ProductCategory.find({ category: { $in: allCategoryIds } }).populate('product');
    let products = filterProductsByCategoryTree(prodCats, allCategoryIds);

    products = sortProducts(products, sort);
    const productsWithImages = await attachImagesToProducts(products);

    res.status(200).json({ success: true, data: productsWithImages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Giữ nguyên hàm này
const getProductsBySpecialType = async (req, res) => {
  try {
    const { specialType } = req.params;
    const { parentId, sort } = req.query;

    if (!specialType) {
      return res.status(400).json({ success: false, message: "Missing specialType" });
    }

    let products = [];

    switch (specialType) {
      case "featured":
        if (!parentId) {
          return res.status(400).json({ success: false, message: "Missing parentId for featured" });
        }
        const section = await FeaturedSection.findOne({ categoryId: parentId });
        if (section) {
          const featuredProducts = await FeaturedSectionProduct.find({ featuredSectionId: section._id }).populate("productId");
          products = featuredProducts.map(fp => fp.productId).filter(Boolean);
        }
        break;

      case "newest":
        if (!parentId) {
          return res.status(400).json({ success: false, message: "Missing parentId for newest" });
        }
        const newestCategoryIds = await getAllCategoryIds(parentId);
        const newestProdCats = await ProductCategory.find({ category: { $in: newestCategoryIds } }).populate('product');
        products = newestProdCats.map(pc => pc.product).filter(Boolean);
        break;

      case "ptmonth":
        if (!parentId) {
          return res.status(400).json({ success: false, message: "Missing parentId for ptmonth" });
        }
        const ptCategoryIds = await getAllCategoryIds(parentId);
        const ptProdCats = await ProductCategory.find({ category: { $in: ptCategoryIds } }).populate('product');
        products = ptProdCats.map(pc => pc.product).filter(p => p && typeof p.totalSold === 'number');
        break;

      default:
        return res.status(400).json({ success: false, message: "Invalid specialType" });
    }

    products = sortProducts(products, sort);
    const productsWithImages = await attachImagesToProducts(products);
    res.status(200).json({ success: true, data: productsWithImages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Không cần sửa hàm này
const getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const prodCats = await ProductCategory.find({ category: categoryId }).populate('product');
    const products = prodCats.map(pc => pc.product).filter(Boolean);
    const productsWithImages = await attachImagesToProducts(products);
    res.status(200).json({ success: true, data: productsWithImages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Đã sửa: lọc sản phẩm đúng theo cây category
const searchProducts = async (req, res) => {
  try {
    const {
      q,
      keyword = q || "",
      category: categoryId,
      sort,
      minPrice,
      maxPrice,
      technology
    } = req.query;

    let allCategoryIds = [];
    if (categoryId) {
      allCategoryIds = await getAllCategoryIds(categoryId);
    }

    const allProdCats = await ProductCategory.find().populate("product");
    let products = categoryId
      ? filterProductsByCategoryTree(allProdCats, allCategoryIds)
      : allProdCats.map(pc => pc.product).filter(Boolean);

    // Loại trùng
    const seen = new Set();
    products = products.filter(p => {
      if (seen.has(p._id.toString())) return false;
      seen.add(p._id.toString());
      return true;
    });

    // Lọc theo keyword
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      products = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(lowerKeyword)) ||
        (p.description && p.description.toLowerCase().includes(lowerKeyword))
      );
    }

    if (technology) {
      products = products.filter(p => p.technology === technology);
    }

    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    products = sortProducts(products, sort);
    const productsWithImages = await attachImagesToProducts(products);

    const rootCategoryId = categoryId ? await findRootCategory(categoryId) : null;

    res.status(200).json({
      success: true,
      data: productsWithImages,
      rootCategoryId
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createFullProduct,
  getProductsByCategory,
  getProductsBySpecialType,
  getProductsByCategoryId,
  searchProducts
};
