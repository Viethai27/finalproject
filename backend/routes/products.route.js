import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createFullProduct,
  getProductsByCategory,
  getProductsBySpecialType,
  getProductsByCategoryId,
  searchProducts
} from '../controllers/product.controller.js';

const router = express.Router();

// Lấy tất cả sản phẩm (toàn bộ bảng Product)
router.get('/', getProducts);

// Tìm kiếm sản phẩm theo keyword và categoryId (bao gồm category con) + hỗ trợ sort
router.get('/search', searchProducts); // ✅ Thêm dòng này

// Tạo, cập nhật, xóa sản phẩm (basic)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Tạo sản phẩm đầy đủ: product + category + images + featured
router.post('/create-full', createFullProduct);

// Lấy sản phẩm theo category (bao gồm cả con) + hỗ trợ sort (query: ?sort=...)
router.get('/by-category/:categoryId', getProductsByCategory);

// Lấy sản phẩm theo loại đặc biệt (featured, newest, ptmonth) + hỗ trợ sort (query: ?parentId=...&sort=...)
router.get('/special/:specialType', getProductsBySpecialType);

// Lấy sản phẩm theo categoryId đơn (không lấy category con)
router.get('/category/:categoryId/products', getProductsByCategoryId);

export default router;
