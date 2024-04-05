import axios, { AxiosInstance } from 'axios';

const API_URL = 'https://j10e204.p.ssafy.io';

const UseAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['authorization'] = localStorage.getItem('accessToken');
      console.log('요청 보냄 : ', config)
      return config;
    },
    async (error) => {
      console.log(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('응답 : ', response)
      return response;
    },
    async (error) => {
      console.log('에러 응답 : ', error)
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.get(`${API_URL}/api/token`, {
            headers: { authorization: localStorage.getItem('refreshToken') },
          });

          const newAccessToken = response.headers['authorization'];
          const newRefreshToken = response.headers['authorization-refresh'];

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers['authorization'] = newAccessToken;

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
