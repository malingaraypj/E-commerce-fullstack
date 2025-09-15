import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducers/couterSlice";
import cartSlice from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
