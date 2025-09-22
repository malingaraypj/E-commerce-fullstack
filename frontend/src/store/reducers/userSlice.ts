import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/models/User";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null as User | null, isLogged: false },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLogged = true;
    },

    logout(state) {
      state.user = null;
      state.isLogged = false;
    },
  },
});

// Export the actions
export const { login, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
