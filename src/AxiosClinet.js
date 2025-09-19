import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "https://syu-likelion.org/festa/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
AxiosClient.interceptors.request.use((config) => {
  if (config.auth) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  delete config.auth;
  delete config.withAuth;
  delete config.requiresAuth;

  return config;
});

// 응답 인터셉터 (data만 리턴)
AxiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default AxiosClient;
