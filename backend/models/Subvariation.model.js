import mongoose from 'mongoose';

const subvariationSchema = new mongoose.Schema({
  variation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Variation', 
    required: true },
  name: { 
    type: String, 
    required: true } 
});

const Subvariation = mongoose.model('Subvariation', subvariationSchema);
export default Subvariation;

