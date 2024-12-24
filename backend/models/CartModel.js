const mongoose = require('mongoose');
const {Schema} = mongoose;

require('./ProductModel');

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {timestamps: true}
);

const formatAmount = (amount) => Math.round(amount * 100) / 100;

cartSchema.virtual('subtotal').get(function () {
  return this.items.reduce((total, item) => {
    return formatAmount(total + (item.product?.price ?? 0) * item.quantity);
  }, 0);
});

cartSchema.virtual('tax').get(function () {
  return formatAmount(this.subtotal * 0.0625);
});

cartSchema.virtual('estimatedTotal').get(function () {
  if (this.items.length === 0) return 0;
  return this.subtotal + this.tax - this.discount;
});

cartSchema.set('toObject', {virtuals: true});
cartSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Cart', cartSchema);
