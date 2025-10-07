import { newToaster } from "@/components/Notification/newToaster";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();
export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const toaster = newToaster({
  positionX: "right",
  positionY: "bottom",
  duration: 5,
  type: "error",
});

export const getData = async (url: string, signal: AbortSignal) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {} as { Authorization?: string },
      signal: signal,
    };

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(url, config);

    return response.data?.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      return;
    }

    const message = axios.isAxiosError(err) && err.response?.data?.message;
    if (message) {
      toaster(message);
      console.error(`Error fetching data from ${url}:`, message);
      throw new Error(message);
    }

    throw err;
  }
};

export const postData = async (url: string, data = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {} as { Authorization?: string },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios.post(url, data, config);

    return response.data?.data;
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response?.data?.message;
    if (message) {
      toaster(message);
      console.error(`Error fetching data from ${url}:`, message);
      throw new Error(message);
    }
    console.error(`Error fetching data from ${url}:`, err);
    throw err;
  }
};

export const patchData = async (url: string, data = {}) => {
  const token = localStorage.getItem("token");

  const config: { headers: { Authorization?: string } } = {
    headers: {},
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios.patch(url, data, config);

    return response.data?.data;
  } catch (err) {
    console.error(`Error patching data to ${url}:`, err);
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data;
    }
    throw err;
  }
};
