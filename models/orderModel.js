import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Products",
        },
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Chưa xử lý",
      enum: [
        "Chưa xử lý",
        "Đang xử lý",
        "Đã vận chuyển",
        "Đã nhận hàng",
        "Hủy hàng",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
