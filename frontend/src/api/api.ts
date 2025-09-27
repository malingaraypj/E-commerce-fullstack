import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();
export const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getData = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {} as { Authorization?: string },
    };

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(url, config);

    return response.data?.data;
  } catch (err) {
    console.error(`Error fetching data from ${url}:`, err);

    throw err;
  }
};
