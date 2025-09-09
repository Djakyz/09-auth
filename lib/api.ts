import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const BASE_URL = "https://notehub-api.goit.study";

const noteHubAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
});
