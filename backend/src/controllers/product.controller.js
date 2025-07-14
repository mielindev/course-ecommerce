import Product from "../models/product.model.js";

const productController = {
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
    } catch (error) {
      console.log("Error in createProduct controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getProducts: async (req, res) => {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const pageSize = Math.max(1, parseInt(req.query.pageSize) || 10);
      const skip = (page - 1) * pageSize;
      const [products, total] = await Promise.all([
        Product.find().skip(skip).limit(pageSize).populate("category"),
        Product.countDocuments(),
      ]);
      return res.status(200).json({
        data: products,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate("category");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.log("Error getting product:", error);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default productController;
