import axios, { AxiosInstance } from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const API_URL = 'http://localhost:8080'

type test = {
  accessToken : null | string,
  refreshToken : null | string
}
const UseAxios = ():AxiosInstance  => {
  const [tokens, setTokens] = useState<test>({ accessToken: null, refreshToken: '' });

  useEffect(() => {
    const accessToken = localStorage?.getItem('accessToken');
    const refreshToken = localStorage?.getItem('refreshToken');
    setTokens({ accessToken, refreshToken });
  }, [])

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${tokens?.accessToken}` },
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken: tokens.refreshToken,
          });

          const newAccessToken = response.headers['authorization'];
          const newRefreshToken = response.headers['authorization-refresh'];
          
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken)

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error('Error refreshing token:', error);
          throw error;
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default UseAxios
