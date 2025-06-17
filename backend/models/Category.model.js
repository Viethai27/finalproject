import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  specialType: {
    type: String,
    enum: ['featured', 'newest', 'popular'],
    default: null
  }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;