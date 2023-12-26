import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL ? `${process.env.REACT_APP_BASE_URL}` : '/api',
  timeout: 1000,
  headers: { 'accept': 'application/json' },
});

apiService.interceptors.request.use((config: any) => {
  if (process.env.REACT_APP_BASE_URL) config.headers = { ...config.headers, Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}` }
  return config;
}, (err) => Promise.reject(err)
);

apiService.interceptors.response.use(
  (res) => { return res },
  async (err) => {
    try {
      const originalConfig = err.config;
      if (axios.isCancel(err)) {
        originalConfig._retry = true;
        return apiService(originalConfig);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export { apiService };