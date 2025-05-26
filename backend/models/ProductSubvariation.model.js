import mongoose from 'mongoose';

const productSubvariationSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true },
  subvariation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subvariation', 
    required: true }
});

const ProductSubvariation = mongoose.model('ProductSubvariation', productSubvariationSchema);
export default ProductSubvariation;
