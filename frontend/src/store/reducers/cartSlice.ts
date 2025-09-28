import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/models/product";

const initialState: { product: Product; count: number }[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count++;
      } else {
        state.push({ product: action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((item) => item.product.id !== action.payload.id);
    },
    updateCartCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const item = state.find((item) => item.product.id === action.payload.id);
      if (item && action.payload.count === 0) {
        return state.filter((item) => item.product.id !== action.payload.id);
      }
      if (item) {
        item.count = action.payload.count;
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartCount, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
