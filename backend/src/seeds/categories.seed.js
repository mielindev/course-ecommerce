import mongoose from "mongoose";
import { config } from "dotenv";
import Category from "../models/category.model.js";
import connectDB from "../lib/db.js";
config();

const categories = [
  {
    name: "Mobile Development",
    description:
      "Learn to build apps for iOS and Android using Flutter, React Native, or native languages.",
  },
  {
    name: "Data Science",
    description:
      "Explore Python, R, data analysis, visualization, and machine learning.",
  },
  {
    name: "Graphic Design",
    description:
      "Learn tools like Photoshop, Illustrator, and principles of visual design.",
  },
  {
    name: "Business & Marketing",
    description:
      "Courses on entrepreneurship, digital marketing, SEO, branding, and sales.",
  },
  {
    name: "UI/UX Design",
    description:
      "Master user research, wireframing, prototyping, and usability testing.",
  },
  {
    name: "Cybersecurity",
    description:
      "Understand ethical hacking, network security, and information protection.",
  },
  {
    name: "AI & Machine Learning",
    description:
      "Dive into neural networks, deep learning, and AI tools with hands-on projects.",
  },
  {
    name: "Finance & Accounting",
    description:
      "Learn budgeting, investing, financial modeling, and accounting principles.",
  },
  {
    name: "Personal Development",
    description:
      "Improve productivity, mindset, habits, communication, and goal setting.",
  },
];

const seedCategories = async () => {
  try {
    await connectDB();
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("Categories seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding categories:", err);
    process.exit(1);
  }
};

seedCategories();
