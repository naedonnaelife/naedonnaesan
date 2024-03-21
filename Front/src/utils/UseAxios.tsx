import axios, { AxiosInstance } from "axios";

const API_URL = "https://j10e204.p.ssafy.io/api";

const UseAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      // config.headers["authorization"] = localStorage.getItem("accessToken")
      config.headers["authorization"] =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3MiLCJleHAiOjE3MTEwOTIwMjMsInJvbGUiOiJVU0VSIiwiaWQiOjR9.kFpbz09iIvAzCew_qjdZiZ34brPj6F5__zRXzaFxg-0";
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
            headers: { authorization: localStorage.getItem("refreshToken") },
          });

          const newAccessToken = response.headers["authorization"];
          const newRefreshToken = response.headers["authorization-refresh"];

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          return axiosInstance(originalRequest);
        } catch (error) {
          console.error("Error refreshing token:", error);
          throw error;
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default UseAxios;
