import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  slug: {
    type: String,
    unique: true
  }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
