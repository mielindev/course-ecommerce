import axios from "axios";

const axiosIntance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosIntance;
