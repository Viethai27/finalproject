import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true }
});

const Variation = mongoose.model('Variation', variationSchema);
export default Variation;

