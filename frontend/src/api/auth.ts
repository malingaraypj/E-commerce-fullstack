import axios from "axios";
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/create-user`;
  return await axios.post(url, data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
  return await axios.post(url, data);
};
