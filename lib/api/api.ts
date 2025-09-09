import axios from "axios";

export const BASE_URL = "https://notehub-api.goit.study";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});
