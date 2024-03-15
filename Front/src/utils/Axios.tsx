import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const API_URL = 'http://localhost:8080'

export const useAxios = () => {
  const [tokens, setTokens] = useState({ accessToken: null, refreshToken: null });

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

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          
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
