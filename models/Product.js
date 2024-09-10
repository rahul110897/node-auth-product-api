// models/Product.js
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence'; // Import the plugin using ES modules

const productSchema = new mongoose.Schema({
  productId: {
    type: Number, // Custom auto-incrementing ID
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

// Add auto-increment plugin to the schema
const autoIncrementPlugin = autoIncrement(mongoose);
productSchema.plugin(autoIncrementPlugin, { inc_field: 'productId' });

export default mongoose.model('Product', productSchema);
