import { loginUser as loginAPI } from "@/api/auth";
import { login } from "../reducers/userSlice";
import type { AppDispatch } from "../store";
import { isAxiosError } from "axios";

// Define the type for the return value of the async thunk
type LoginResult = {
  success: boolean;
  message?: string;
};

// This is the thunk action creator
export const loginUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch): Promise<LoginResult> => {
    console.log("inside action thunk");
    try {
      const response = await loginAPI({ email, password });

      const user = response.data?.data;
      console.log(user);

      if (user) {
        dispatch(login(user));
        return { success: true };
      } else {
        return { success: false, message: "Login failed: No user data found." };
      }
    } catch (err) {
      // Use type narrowing for a more robust error handling
      const errorMessage =
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
          ? err.message
          : "An unknown error occurred.";

      console.error("Login failed:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };
};
