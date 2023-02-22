const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [
      // {
      //   id: { type: String },
      //   name: { type: String },
      //   brand: { type: String },
      //   desc: { type: String },
      //   price: { type: String },
      //   image: { type: String },
      //   cartQuantity: { type: Number },
      // },
    ],
    subtotal: { type: String, required: true },
    total: { type: String, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

exports.Order = Order;
