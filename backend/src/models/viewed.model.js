import mongoose from "mongoose";

const viewedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

viewedSchema.index({ user: 1, product: 1 }, { unique: true });

const Viewed = mongoose.model("Viewed", viewedSchema);

export default Viewed;
