import axios, { AxiosRequestConfig } from "axios";
import { getToken, setToken } from "@/utils/storage";
import { BASEURL } from "@/consts";

const instance = axios.create({
  baseURL: BASEURL,
});
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers["Authentication"] = getToken();
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      setToken("");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default instance;
