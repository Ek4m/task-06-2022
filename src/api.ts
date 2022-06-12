import { REST_API } from "./constants/api";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: REST_API,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("access_token"))
      ?.split("=")[1];
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? "Bearer " + token : null,
      },
    };
  },
  (error) => {
    console.log("AXIOS ERROR", error);
    return Promise.reject(error);
  }
);

export const api = {
  login: (data: FormData) => axiosInstance.post("/login", data),
  getAllUsers: () => axiosInstance.get(REST_API + "/users"),
  createUser: (data: any) =>
    axiosInstance.post(REST_API + "/users/create", data),
};
