import Favorite from "../models/favorite.model.js";
import Product from "../models/product.model.js";
import Viewed from "../models/viewed.model.js";

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

  getSuggestions: async (req, res) => {
    try {
      const userId = req.user._id;

      // Get latest 5 viewed and 5 favorited products
      const [viewed, favorited] = await Promise.all([
        Viewed.find({ user: userId }).sort({ updatedAt: -1 }).limit(5).lean(),
        Favorite.find({ user: userId }).sort({ createdAt: -1 }).limit(5).lean(),
      ]);

      const viewedIds = viewed.map((v) => v.product.toString());
      const favortedIds = favorited.map((f) => f.product.toString());
      const interactedIds = [...new Set([...viewedIds, ...favortedIds])];
      const interactedProducts = await Product.find({
        _id: { $in: interactedIds },
      })
        .select("category name description")
        .lean();

      const categorySet = new Set();
      const nameSet = new Set();
      const descriptionSet = new Set();

      for (const product of interactedProducts) {
        if (product.category) categorySet.add(product.category.toString());
        if (product.name) nameSet.add(product.name.toString());
        if (product.description)
          descriptionSet.add(product.description.toString());
      }

      const sugestions = await Product.find({
        _id: { $nin: interactedIds },
        $or: [
          { category: { $in: Array.from(categorySet) } },
          { name: { $in: Array.from(nameSet) } },
          { description: { $in: Array.from(descriptionSet) } },
        ],
      });

      return res.status(200).json({
        message: "Suggestions retrieved successfully",
        data: sugestions,
      });
    } catch (error) {
      console.log("Error getting suggestions:", error);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default productController;
