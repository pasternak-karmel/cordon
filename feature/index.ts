import axios from "axios";

import { getAccessToken } from "@/actions/token/token";
import { url_gocardless } from "@/constant";

const token = await getAccessToken();
// Create a new axios instance with the base URL and headers
export const apiAxios = axios.create({
  baseURL: `${url_gocardless}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});
