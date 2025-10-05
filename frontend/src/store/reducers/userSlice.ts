import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/models/User";

// Function to load user from localStorage
const loadUserFromStorage = (): { user: User | null; isLogged: boolean } => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return { user: null, isLogged: false };
    }
    const user = JSON.parse(serializedUser);
    return { user, isLogged: true };
  } catch {
    return { user: null, isLogged: false };
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUserFromStorage(),
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLogged = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout(state) {
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

// Export the actions
export const { login, logout, updateUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
