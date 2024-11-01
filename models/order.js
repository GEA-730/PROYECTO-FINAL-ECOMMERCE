const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      cantidad: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

