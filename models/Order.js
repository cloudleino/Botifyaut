const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    status: { type: String, enum: ['new','in_progress','klar'], default: 'new' },
    price: { type: Number, default: 0 }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Order', OrderSchema);
