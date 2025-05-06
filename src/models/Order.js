const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
    required: true
  },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  coupon: {
    code: { type: String },
    discount: { type: Number } // % de descuento, ej: 10
  },
  /* payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  } */
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);