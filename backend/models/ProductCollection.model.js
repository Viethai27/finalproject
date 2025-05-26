import mongoose from 'mongoose';

const productCollectionSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true },
  collection: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Collection', 
    required: true }
});

const ProductCollection = mongoose.model('ProductCollection', productCollectionSchema);
export default ProductCollection;
