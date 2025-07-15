import mongoose from "mongoose";

const viewedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Viewed = mongoose.model("Viewed", viewedSchema);

export default Viewed;
