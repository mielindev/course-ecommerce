import connectDB from "../lib/db.js";
import { config } from "dotenv";
import Product from "../models/product.model.js";
config();

const products = [
  {
    name: "React for Beginners",
    price: 450000,
    image:
      "https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_52683-79844.jpg",
    description:
      "Master the fundamentals of React.js through hands-on examples and projects. This course takes you from understanding components, state, and props to building your first modern, interactive single-page application using React.",
    shortDescription: "React basics and components",
    rating: 4.5,
    isSuggested: true,
    category: "6873728ed42adef51a81e986",
    viewedByUsers: [],
  },
  {
    name: "Advanced JavaScript",
    price: 750000,
    image:
      "https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept_335657-2412.jpg",
    description:
      "Take your JavaScript skills to the next level. This course covers closures, prototypes, asynchronous programming, and performance optimizations to help you write cleaner, faster, and more maintainable code.",
    shortDescription: "Deep JS knowledge",
    rating: 4.7,
    isSuggested: false,
    category: "6873728ed42adef51a81e986",
    viewedByUsers: [],
  },
  {
    name: "Flutter Mobile App Development",
    price: 950000,
    image:
      "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg",
    description:
      "Learn how to build beautiful, fast, and cross-platform mobile apps using Flutter. From setting up your development environment to deploying on iOS and Android, this course provides a full-stack Flutter experience.",
    shortDescription: "Cross-platform Flutter course",
    rating: 4.3,
    isSuggested: true,
    category: "687372768eb88e71a4cacd8f",
    viewedByUsers: [],
  },
  {
    name: "Python for Data Science",
    price: 600000,
    image:
      "https://img.freepik.com/premium-photo/python-inscription-text-against-laptop-code-background-learn-python-programming-language_488220-61295.jpg",
    description:
      "Unlock the power of Python for data analysis and visualization. This course covers data manipulation with Pandas, numerical computation with NumPy, and basic plotting using Matplotlib and Seaborn.",
    shortDescription: "Data with Python",
    rating: 4.6,
    isSuggested: false,
    category: "687372768eb88e71a4cacd90",
    viewedByUsers: [],
  },
  {
    name: "Photoshop Essentials",
    price: 380000,
    image:
      "https://img.freepik.com/premium-vector/desktop-publishing-page-layout-design-software-application-program-creating-printed-product_681307-160.jpg",
    description:
      "Get up to speed with the essential tools of Adobe Photoshop. Learn how to retouch photos, work with layers, apply effects, and build your own creative projects for social media or professional design.",
    shortDescription: "Photoshop basics",
    rating: 4.2,
    isSuggested: true,
    category: "687372768eb88e71a4cacd91",
    viewedByUsers: [],
  },
  {
    name: "SEO & Digital Marketing Masterclass",
    price: 870000,
    image:
      "https://img.freepik.com/free-psd/web-design-with-hands-sale-background_23-2151649816.jpg",
    description:
      "Gain mastery in SEO, content marketing, and analytics. You'll learn how to optimize websites for search engines, build campaigns that convert, and understand how to grow an online presence effectively.",
    shortDescription: "Boost your marketing",
    rating: 4.4,
    isSuggested: true,
    category: "687372768eb88e71a4cacd92",
    viewedByUsers: [],
  },
  {
    name: "UX Design Fundamentals",
    price: 540000,
    image:
      "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051556.jpg",
    description:
      "Dive into the principles of user-centered design. Learn wireframing, prototyping, usability testing, and how to design interfaces that create meaningful and enjoyable experiences for users.",
    shortDescription: "Design great experiences",
    rating: 4.1,
    isSuggested: false,
    category: "687372768eb88e71a4cacd93",
    viewedByUsers: [],
  },
  {
    name: "Ethical Hacking & Cybersecurity",
    price: 1080000,
    image:
      "https://img.freepik.com/free-photo/cybersecurity-concept-illustration_23-2151883569.jpg",
    description:
      "Protect networks, data, and systems by learning ethical hacking techniques. This course covers penetration testing, vulnerability scanning, and security best practices from a real-world perspective.",
    shortDescription: "Hack the right way",
    rating: 4.8,
    isSuggested: true,
    category: "687372768eb88e71a4cacd94",
    viewedByUsers: [],
  },
  {
    name: "Intro to Machine Learning",
    price: 990000,
    image:
      "https://img.freepik.com/premium-vector/digital-illustration-with-futuristic-machine-learning-technological-style_1159859-7053.jpg",
    description:
      "Explore the fundamentals of machine learning, including supervised and unsupervised learning, model training, and evaluation. Get hands-on experience with Scikit-learn and real datasets.",
    shortDescription: "Learn ML basics",
    rating: 4.5,
    isSuggested: false,
    category: "687372768eb88e71a4cacd95",
    viewedByUsers: [],
  },
  {
    name: "Excel for Finance",
    price: 620000,
    image:
      "https://img.freepik.com/premium-vector/data-analysis-with-excel-application_999616-2544.jpg",
    description:
      "Learn how to harness Excel for financial analysis. Cover formulas, pivot tables, scenario planning, and building financial models that support smarter business decisions.",
    shortDescription: "Finance with Excel",
    rating: 4.3,
    isSuggested: true,
    category: "687372768eb88e71a4cacd96",
    viewedByUsers: [],
  },
  {
    name: "Goal Setting for Success",
    price: 300000,
    image:
      "https://img.freepik.com/premium-vector/business-goals-progress-achievement-target-with-arrow-bullseye-goal-lettering_213110-7927.jpg",
    description:
      "Unlock your potential by learning how to set and achieve goals using proven techniques. This course blends psychology and productivity strategies to help you create a path to success.",
    shortDescription: "Achieve your dreams",
    rating: 4.0,
    isSuggested: false,
    category: "687372768eb88e71a4cacd97",
    viewedByUsers: [],
  },
  {
    name: "Node.js & Express Backend",
    price: 850000,
    image:
      "https://img.freepik.com/free-vector/flat-design-api-infographic_23-2149364435.jpg",
    description:
      "Build scalable backend services and RESTful APIs using Node.js and Express. You'll create complete server-side applications and connect them to databases and frontend interfaces.",
    shortDescription: "Backend development",
    rating: 4.6,
    isSuggested: true,
    category: "6873728ed42adef51a81e986",
    viewedByUsers: [],
  },
  {
    name: "Kotlin for Android",
    price: 780000,
    image:
      "https://img.freepik.com/premium-vector/modern-3d-illustration-data-analysis-concept_145666-1943.jpg",
    description:
      "Learn Kotlin programming and Android development with hands-on projects. Build modern mobile applications using Android Studio, Jetpack libraries, and best practices.",
    shortDescription: "Modern Android development",
    rating: 4.4,
    isSuggested: false,
    category: "687372768eb88e71a4cacd8f",
    viewedByUsers: [],
  },
  {
    name: "Deep Learning with TensorFlow",
    price: 1200000,
    image:
      "https://img.freepik.com/premium-vector/artificial-intelligence-technology-brain-circuitry-computer-with-accompanying-data_111088-2615.jpg",
    description:
      "Master the foundations of deep learning using TensorFlow. You'll build, train, and evaluate neural networks for real-world problems like image and text classification.",
    shortDescription: "Neural networks hands-on",
    rating: 4.7,
    isSuggested: true,
    category: "687372768eb88e71a4cacd95",
    viewedByUsers: [],
  },
  {
    name: "Accounting Basics",
    price: 500000,
    image:
      "https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg",
    description:
      "Develop a strong foundation in accounting by learning key concepts like balance sheets, income statements, and financial ratios. Ideal for students, entrepreneurs, or career changers.",
    shortDescription: "Master the balance sheet",
    rating: 4.2,
    isSuggested: false,
    category: "687372768eb88e71a4cacd96",
    viewedByUsers: [],
  },
  {
    name: "Figma for UI Design",
    price: 400000,
    image:
      "https://img.freepik.com/free-vector/flat-design-ui-kit-collection_23-2149188521.jpg",
    description:
      "Learn how to design beautiful and functional interfaces using Figma. Collaborate with teams, prototype user flows, and apply design systems to streamline your design process.",
    shortDescription: "Design in the browser",
    rating: 4.4,
    isSuggested: true,
    category: "687372768eb88e71a4cacd93",
    viewedByUsers: [],
  },
  {
    name: "Startup Marketing Essentials",
    price: 680000,
    image:
      "https://img.freepik.com/premium-photo/best-high-quality-illustrations-ecommerce-store-marketing-google-ads_1266756-253.jpg",
    description:
      "Discover practical strategies to grow your startup using digital marketing. This course covers social media, paid ads, SEO, content creation, and funnel optimization.",
    shortDescription: "Marketing for growth",
    rating: 4.3,
    isSuggested: false,
    category: "687372768eb88e71a4cacd92",
    viewedByUsers: [],
  },
  {
    name: "Cyber Threat Intelligence",
    price: 1150000,
    image:
      "https://img.freepik.com/premium-photo/digital-system-security-interface_670147-74964.jpg",
    description:
      "Understand how to identify, analyze, and respond to emerging cybersecurity threats. Learn threat modeling, intelligence gathering, and risk mitigation from an enterprise perspective.",
    shortDescription: "Stay ahead of hackers",
    rating: 4.6,
    isSuggested: true,
    category: "687372768eb88e71a4cacd94",
    viewedByUsers: [],
  },
  {
    name: "Illustrator for Beginners",
    price: 350000,
    image:
      "https://img.freepik.com/premium-vector/designer-works-concept-with-people-scene-flat-line-design-web-man-drawing-designing-with-digital-tools-colors-palette-vector-illustration-social-media-banner-marketing-material_9209-13936.jpg",
    description:
      "Get started with Adobe Illustrator and learn how to create logos, icons, and vector art. Ideal for aspiring designers or hobbyists who want to bring their ideas to life.",
    shortDescription: "Intro to vector art",
    rating: 4.1,
    isSuggested: false,
    category: "687372768eb88e71a4cacd91",
    viewedByUsers: [],
  },
  {
    name: "Time Management Mastery",
    price: 420000,
    image:
      "https://img.freepik.com/free-vector/hand-drawn-time-management-concept_23-2148843889.jpg",
    description:
      "Become more productive and focused by learning how to manage your time effectively. This course teaches prioritization, habit-building, and tools to help you get more done.",
    shortDescription: "Work smarter, not harder",
    rating: 4.0,
    isSuggested: true,
    category: "687372768eb88e71a4cacd97",
    viewedByUsers: [],
  },
];

try {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Database seeded successfully");
  process.exit();
} catch (error) {
  console.log("Error seeding database:", error);
  process.exit(1);
}
