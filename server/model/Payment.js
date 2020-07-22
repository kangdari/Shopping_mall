const mongoose = require('mongoose');
const Schema = mongoose;

const paymentSchema =
  ({
    user: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    product: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true });

const Payment = Schema.model('Payment', paymentSchema);

module.exports = { Payment };
