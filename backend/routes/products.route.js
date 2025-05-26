import express from 'express';
import {getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createFullProduct,
  getPopularThisMonth,
  getProductsByCategory,
  getNewestProductsByRootCategory} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/full', createFullProduct);
router.get('/by-category/:categoryId', getProductsByCategory);
router.get('/popular-this-month', getPopularThisMonth);
router.get('/newest', getNewestProductsByRootCategory);

export default router;
