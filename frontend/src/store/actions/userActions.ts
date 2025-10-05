import { loginUser as loginAPI } from "@/api/auth";
import { updateUserProfile as updateUserAPI } from "@/api/user";
import { login, updateUser } from "../reducers/userSlice";
import type { AppDispatch } from "../store";
import { isAxiosError } from "axios";
import type { User } from "@/models/User";

// Define a consistent type for the action return status
type ActionStatus = {
  success: boolean;
  message?: string;
};

// This is the thunk action creator for logging in
export const loginUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch): Promise<ActionStatus> => {
    try {
      const response = await loginAPI({ email, password });
      const user = response.data?.data;
      const token = response.data?.token;

      if (user) {
        dispatch(login({ user, token }));
        return { success: true };
      } else {
        return { success: false, message: "Login failed: No user data found." };
      }
    } catch (err) {
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

// Corrected thunk for updating the user profile
export const updateUserProfile = (profileData: Partial<User>) => {
  return async (dispatch: AppDispatch): Promise<ActionStatus> => {
    try {
      // Call the API function to update the user
      const updatedUser = await updateUserAPI(profileData);

      // Dispatch the synchronous action to update the Redux store
      dispatch(updateUser(updatedUser));

      return { success: true, message: "Profile updated successfully." };
    } catch (err) {
      const errorMessage =
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
          ? err.message
          : "Profile update failed.";

      console.error("Profile update failed:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };
};
