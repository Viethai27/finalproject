import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },
  description: String,
  images: [String]
});

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;