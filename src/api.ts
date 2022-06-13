import { REST_API } from "./constants/api";
import axios from "axios";
import { UserGetCredentials, UserPostCredentials } from "./types";

const axiosInstance = axios.create({
  baseURL: REST_API,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("request from axios");
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
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("response from axios");
    return response;
  },
  function (error) {
    console.log("AXIOS ERROR", error);
    if (error.response.status === 401) {
      console.log("BAAA 401di");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const api = {
  login: (data: FormData) => axiosInstance.post("/login", data),
  getAllUsers: () =>
    axiosInstance.get<{ data: UserGetCredentials[] }>("/users"),
  createUser: (data: any) => axiosInstance.post("/users/create", data),
  getSingleUser: (id: string) =>
    axiosInstance.get<{ data: UserGetCredentials }>(`users/info?user_id=${id}`),
  updateSingleUser: (id: string, data: UserPostCredentials) =>
    axiosInstance.post(`users/edit`, data),
  blockUnblockUsers: (data: { user_id: number[] }) =>
    axiosInstance.post(`users/block`, data),
};
