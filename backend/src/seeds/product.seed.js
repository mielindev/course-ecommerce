import connectDB from "../lib/db.js";
import { config } from "dotenv";
import Product from "../models/product.model.js";
config();

const dummyProducts = [
  {
    name: "React Cơ Bản",
    price: 450000,
    images: "https://picsum.photos/300/200?random=1",
    description:
      "Khóa học React Cơ Bản giúp bạn từng bước làm chủ thư viện React. Bạn sẽ học về JSX, component, state, props và các hook cơ bản. Khóa học bao gồm nhiều bài thực hành và một dự án thực tế giúp bạn củng cố kiến thức.",
    shortDescription: "Khóa học React căn bản.",
    rating: 4.5,
    isSuggested: true,
  },
  {
    name: "Node.js API Pro",
    price: 550000,
    images: "https://picsum.photos/300/200?random=2",
    description:
      "Khóa học Node.js nâng cao tập trung vào việc xây dựng API RESTful chuyên nghiệp. Bạn sẽ học về Express.js, JWT, middleware, xác thực người dùng, kết nối cơ sở dữ liệu MongoDB và triển khai thực tế.",
    shortDescription: "Khóa học Node.js chuyên sâu.",
    rating: 4.7,
    isSuggested: false,
  },
  {
    name: "HTML CSS Mastery",
    price: 390000,
    images: "https://picsum.photos/300/200?random=3",
    description:
      "Khóa học giúp bạn nắm vững HTML5 và CSS3, từ cấu trúc trang web cơ bản đến tạo bố cục linh hoạt với Flexbox và Grid. Bạn sẽ thực hành xây dựng giao diện web hoàn chỉnh, responsive trên mọi thiết bị.",
    shortDescription: "HTML & CSS cho người mới.",
    rating: 4.3,
    isSuggested: true,
  },
  {
    name: "JavaScript Nâng Cao",
    price: 620000,
    images: "https://picsum.photos/300/200?random=4",
    description:
      "JavaScript là nền tảng của web hiện đại. Trong khóa học này, bạn sẽ học về các khái niệm nâng cao như closure, prototype, async/await, promise, và xử lý bất đồng bộ. Có nhiều ví dụ thực tế và bài tập kèm theo.",
    shortDescription: "Khóa học JavaScript nâng cao.",
    rating: 4.6,
    isSuggested: false,
  },
  {
    name: "TypeScript Fundamentals",
    price: 510000,
    images: "https://picsum.photos/300/200?random=5",
    description:
      "Khóa học dành cho những ai muốn nâng cấp kỹ năng JavaScript với TypeScript. Bạn sẽ học về type annotation, interface, generic, và các tính năng giúp mã code an toàn, dễ bảo trì hơn.",
    shortDescription: "Học TypeScript cơ bản.",
    rating: 4.4,
    isSuggested: false,
  },
  {
    name: "Next.js Thực Chiến",
    price: 780000,
    images: "https://picsum.photos/300/200?random=6",
    description:
      "Next.js là framework mạnh mẽ cho React. Bạn sẽ học cách tạo ứng dụng SSR, SSG, routing động, API route, cùng triển khai dự án thực tế trên Vercel. Khóa học còn giúp tối ưu hiệu suất và SEO.",
    shortDescription: "Thành thạo Next.js.",
    rating: 4.8,
    isSuggested: true,
  },
  {
    name: "Tailwind CSS Pro",
    price: 460000,
    images: "https://picsum.photos/300/200?random=7",
    description:
      "Thiết kế giao diện web đẹp, chuẩn UI/UX với Tailwind CSS. Học cách tuỳ chỉnh theme, responsive nhanh chóng và xây dựng các component giao diện như button, card, modal chuyên nghiệp.",
    shortDescription: "Giao diện nhanh với Tailwind.",
    rating: 4.5,
    isSuggested: false,
  },
  {
    name: "Git & GitHub Cơ Bản",
    price: 300000,
    images: "https://picsum.photos/300/200?random=8",
    description:
      "Làm quen với Git, hệ thống quản lý phiên bản phổ biến nhất hiện nay. Học cách commit, branch, merge, pull request, và cộng tác hiệu quả trên GitHub với các workflow chuyên nghiệp.",
    shortDescription: "Git cơ bản cho lập trình.",
    rating: 4.2,
    isSuggested: false,
  },
  {
    name: "RESTful API Design",
    price: 590000,
    images: "https://picsum.photos/300/200?random=9",
    description:
      "Học cách thiết kế và tổ chức API chuẩn RESTful với tính mở rộng cao. Bao gồm versioning, status code, lỗi phổ biến và bảo mật API. Phù hợp cho cả backend và frontend developer.",
    shortDescription: "Thiết kế API chuẩn REST.",
    rating: 4.6,
    isSuggested: false,
  },
  {
    name: "MongoDB cho Developer",
    price: 510000,
    images: "https://picsum.photos/300/200?random=10",
    description:
      "Khóa học hướng dẫn sử dụng MongoDB trong dự án thực tế. Học về schema design, aggregate, indexing và thao tác CRUD thông qua Mongoose kết hợp Node.js.",
    shortDescription: "MongoDB thực tế.",
    rating: 4.4,
    isSuggested: false,
  },
  {
    name: "Express.js Nâng Cao",
    price: 640000,
    images: "https://picsum.photos/300/200?random=11",
    description:
      "Tăng cường kỹ năng với Express.js, học về cấu trúc ứng dụng theo mô hình MVC, middleware nâng cao, xác thực người dùng, xử lý lỗi tập trung và bảo mật cơ bản.",
    shortDescription: "Express chuyên sâu.",
    rating: 4.5,
    isSuggested: true,
  },
  {
    name: "Firebase App Dev",
    price: 580000,
    images: "https://picsum.photos/300/200?random=12",
    description:
      "Tạo ứng dụng web nhanh chóng với Firebase: authentication, Firestore database, cloud storage và deploy. Tích hợp Google login và các công nghệ hiện đại.",
    shortDescription: "Firebase toàn diện.",
    rating: 4.6,
    isSuggested: false,
  },
  {
    name: "React Hooks Mastery",
    price: 690000,
    images: "https://picsum.photos/300/200?random=13",
    description:
      "Hiểu và áp dụng toàn bộ hook trong React như useState, useEffect, useMemo, useRef, useReducer thông qua các ví dụ thực tế và tối ưu hiệu suất component.",
    shortDescription: "React Hooks nâng cao.",
    rating: 4.7,
    isSuggested: true,
  },
  {
    name: "Redux Toolkit Pro",
    price: 720000,
    images: "https://picsum.photos/300/200?random=14",
    description:
      "Quản lý state hiệu quả với Redux Toolkit. Học về createSlice, createAsyncThunk, middleware và làm việc với API bằng RTK Query. Dễ dàng tích hợp với React.",
    shortDescription: "State management hiện đại.",
    rating: 4.5,
    isSuggested: false,
  },
  {
    name: "Authentication in Web",
    price: 810000,
    images: "https://picsum.photos/300/200?random=15",
    description:
      "Bảo mật ứng dụng web với JWT, session, cookie và xác thực OAuth2. Bạn sẽ học cách tạo hệ thống đăng ký/đăng nhập an toàn và xác thực bên thứ ba (Google, Facebook).",
    shortDescription: "Bảo mật web.",
    rating: 4.4,
    isSuggested: false,
  },
  {
    name: "Responsive Web Design",
    price: 350000,
    images: "https://picsum.photos/300/200?random=16",
    description:
      "Học cách thiết kế giao diện thích ứng với mọi loại màn hình bằng media queries, Flexbox và CSS Grid. Áp dụng thiết kế mobile-first và tối ưu trải nghiệm người dùng.",
    shortDescription: "Thiết kế responsive.",
    rating: 4.3,
    isSuggested: false,
  },
  {
    name: "API với Postman",
    price: 330000,
    images: "https://picsum.photos/300/200?random=17",
    description:
      "Làm chủ công cụ Postman để test API, tạo environment, chạy collection, test script và export tài liệu kỹ thuật. Phù hợp cho backend và tester.",
    shortDescription: "Test API dễ dàng.",
    rating: 4.1,
    isSuggested: false,
  },
  {
    name: "React Router Dom v6",
    price: 470000,
    images: "https://picsum.photos/300/200?random=18",
    description:
      "Khóa học hướng dẫn điều hướng trong ứng dụng React với phiên bản mới nhất của React Router. Học cách sử dụng route động, nested routing, layout route.",
    shortDescription: "Routing trong React.",
    rating: 4.6,
    isSuggested: true,
  },
  {
    name: "Deploy Web App",
    price: 520000,
    images: "https://picsum.photos/300/200?random=19",
    description:
      "Học cách đưa ứng dụng web lên Internet với các nền tảng như Vercel, Netlify và Docker. Bao gồm CI/CD, tối ưu production build và cấu hình tên miền.",
    shortDescription: "Đưa web ra production.",
    rating: 4.2,
    isSuggested: false,
  },
  {
    name: "Web Security Basics",
    price: 870000,
    images: "https://picsum.photos/300/200?random=20",
    description:
      "Nắm vững kiến thức bảo mật cơ bản cho web: XSS, CSRF, CORS, bảo vệ dữ liệu người dùng và bảo mật endpoint API. Cực kỳ cần thiết cho lập trình viên hiện đại.",
    shortDescription: "Bảo mật ứng dụng web.",
    rating: 4.5,
    isSuggested: false,
  },
];

try {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(dummyProducts);
  console.log("Database seeded successfully");
} catch (error) {
  console.log("Error seeding database:", error);
}
