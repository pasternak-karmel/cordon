import { url_gocardless } from "@/constant";
import axios from "axios";

const token =
  typeof window === "undefined" ? null : localStorage.getItem("access_token");
// Create a new axios instance with the base URL and headers
export const apiAxios = axios.create({
  baseURL: `${url_gocardless}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});
