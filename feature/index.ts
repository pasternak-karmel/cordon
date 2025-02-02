import axios from "axios";

import { getAccessToken } from "@/actions/token/token";
import { url_gocardless } from "@/constant";

export const createApiAxios = async () => {
  const token = await getAccessToken();

  if (!token) {
    console.error("Failed to get access token");
    throw new Error("Failed to get access token");
  }

  console.log(
    "Creating axios instance with token:",
    token.slice(0, 10) + "..."
  );

  return axios.create({
    baseURL: `${url_gocardless}/api`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiAxios = await createApiAxios();
