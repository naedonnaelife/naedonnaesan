import axios, { AxiosInstance } from 'axios';

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

  let isRefreshing = false;
  let refreshSubscribers: ((accessToken: string) => void)[] = [];
  
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
  
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const response = await axios.get(`${API_URL}/api/token`, {
              headers: { authorization: localStorage.getItem('refreshToken') },
            });
  
            const newAccessToken = response.headers['authorization'];
            const newRefreshToken = response.headers['authorization-refresh'];
  
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
  
            isRefreshing = false;
  
            onAccessTokenRefreshed(newAccessToken);
          } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
          }
        }
  
        // 대기 중인 요청을 처리할 수 있도록 Promise를 반환
        return new Promise((resolve) => {
          // refreshToken이 갱신될 때까지 대기하는 동안 대기열에 추가
          refreshSubscribers.push((accessToken) => {
            // 대기 중인 요청에 대해 새로운 accessToken으로 재시도
            originalRequest.headers['authorization'] = accessToken;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
  
      return Promise.reject(error);
    }
  );
  
  function onAccessTokenRefreshed(newAccessToken: string) {
    // 대기 중인 요청에 대해 새로운 accessToken을 전달하고 요청을 다시 보냄
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    // 대기열 비우기
    refreshSubscribers = [];
  }
  
  return axiosInstance;
};

export default UseAxios;
