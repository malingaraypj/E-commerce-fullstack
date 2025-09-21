import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducers/couterSlice";
import cartSlice from "./reducers/cartSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
