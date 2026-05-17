import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "development"
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
