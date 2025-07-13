import Category from "../models/category.model.js";

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ message: "Please enter all required fields" });
      }

      const category = await Category.findOne({ name });

      if (category) {
        return res.status(409).json({ message: "Category already exists" });
      }

      const newCategory = new Category({ name, description });
      await newCategory.save();

      return res
        .status(201)
        .json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
      console.log("Error in createCategory controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default categoryController;
