import axios from "axios";

import { getAccessToken } from "@/actions/token/token";
import { url_gocardless } from "@/constant";

const token = await getAccessToken();

export const apiAxios = axios.create({
  baseURL: `${url_gocardless}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});
