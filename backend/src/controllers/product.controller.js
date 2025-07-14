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
      const {
        search,
        category,
        priceOption,
        page = 1,
        pageSize = 10,
      } = req.query;

      const filter = {};

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { shortDescription: { $regex: search, $options: "i" } },
        ];
      }

      if (category) {
        filter.category = category;
      }

      if (priceOption) {
        filter.price = {};
        switch (priceOption) {
          case "below500":
            filter.price.$lt = 500000;
            break;
          case "from500to1000":
            filter.price.$gte = 500000;
            filter.price.$lte = 1000000;
            break;
          case "over1000":
            filter.price.$gt = 1000000;
            break;
          default:
            break;
        }
      }

      const skip = (parseInt(page) - 1) * parseInt(pageSize);

      const [products, total] = await Promise.all([
        Product.find(filter)
          .skip(skip)
          .limit(parseInt(pageSize))
          .populate("category")
          .exec(),
        Product.countDocuments(filter),
      ]);

      return res.status(200).json({
        data: products,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    } catch (error) {
      console.log("Error getting products:", error);
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
