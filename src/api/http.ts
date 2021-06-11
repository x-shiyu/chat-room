import axios, { AxiosRequestConfig } from "axios";
import { getToken, setToken } from "@/utils/storage";
import { BASEURL } from "@/consts";

const instance = axios.create({
  baseURL: "http://" + BASEURL,
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
    }
    return Promise.reject(error);
  }
);
export default instance;
