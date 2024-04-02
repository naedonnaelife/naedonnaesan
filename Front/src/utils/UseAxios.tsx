import axios, { AxiosInstance } from 'axios';

// const API_URL = 'http://localhost:8080/api'
const API_URL = 'https://j10e204.p.ssafy.io';

const UseAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['authorization'] = localStorage.getItem('accessToken');

      return config;
    },
    async (error) => {
      console.log(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.get(`${API_URL}/token`, {
            headers: { authorization: localStorage.getItem('refreshToken') },
          });

          const newAccessToken = response.headers['authorization'];
          const newRefreshToken = response.headers['authorization-refresh'];

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          return axiosInstance(originalRequest);
        } catch (error) {
          console.error('Error refreshing token:', error);
          throw error;
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default UseAxios;
