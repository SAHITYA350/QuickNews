import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach API key automatically
api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey: import.meta.env.VITE_API_KEY,
  };
  return config;
});

export default api;
