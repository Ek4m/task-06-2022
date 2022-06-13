import { REST_API } from "./constants/api";
import axios from "axios";
import { string } from "yup";
import { UserCredentials } from "./types";

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
  getAllUsers: () => axiosInstance.get("/users"),
  createUser: (data: any) => axiosInstance.post("/users/create", data),
  getSingleUser: (id: string) => axiosInstance.get(`users/info?user_id=${id}`),
  updateSingleUser: (id: string, data: UserCredentials) =>
    axiosInstance.post(`users/edit`, data),
  blockUnblockUsers: (data: { user_id: number[] }) =>
    axiosInstance.post(`users/block`, data),
};
