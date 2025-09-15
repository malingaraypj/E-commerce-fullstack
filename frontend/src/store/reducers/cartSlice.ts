import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/models/product";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((product) => product.id != action.payload.id);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
