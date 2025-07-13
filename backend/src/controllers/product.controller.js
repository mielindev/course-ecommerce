const productController = {
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
    } catch (error) {
      console.log("Error in createProduct controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
