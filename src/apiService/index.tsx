import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL ? `${process.env.REACT_APP_BASE_URL}` : '/api',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

apiService.interceptors.request.use((config: any) => {
  // if (config.url && !config.url.includes('auth')) config.headers = { ...config.headers, Authorization: `Bearer ${getStorageItem('token')}` }
  return config;
}, (err) => Promise.reject(err)
);

apiService.interceptors.response.use(
  (res) => { return res },
  async (err) => {
    try {
      const originalConfig = err.config;
      if (originalConfig.url !== "/api/auth/user/local/login" && err.response) {
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;
          // const res = await apiService.post("/auth/user/refreshToken", { refreshToken: getStorageItem("refreshToken") });
          // if (res && res.data.statusCode === 200) {
          //   localStorage.setItem("token", res.data.data)
          //   return apiService(originalConfig);
          // } else {
          //   localStorage.clear()
          // }
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export { apiService };