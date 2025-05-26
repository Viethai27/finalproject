import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  price: {
    type: Number, 
    required: true 
  },
  technology: String,
  totalSold: {
    type: Number,
    default: () => Math.floor(Math.random() * (5000 - 10 + 1)) + 10
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
