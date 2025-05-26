import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', required: true },
  imageUrl: { type: String, 
    required: true }
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);
export default ProductImage;
 