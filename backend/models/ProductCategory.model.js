import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true }
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory;
