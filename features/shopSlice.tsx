import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateRes } from "../interfaces/initialState";
import { Manga } from "../interfaces/manga";

const initialState: InitialStateRes = {
  cartItems: [],
  quantity: 0,
  total: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {
    addToCart: (state: InitialStateRes, action: PayloadAction<Manga>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const manga = { ...action.payload, quantity: 1 };
        state.cartItems.push(manga);
      }
    },
    cartTotal: (state: InitialStateRes) => {
      let quantity = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.quantity = quantity;
      state.total = total;
    },
    removeFromCart: (state: InitialStateRes, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increase: (state: InitialStateRes, action: PayloadAction<number>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem) {
        cartItem.quantity++;
      }
    },
    decrease: (state: InitialStateRes, action: PayloadAction<number>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem) {
        cartItem.quantity--;
      }
    },
    clearCart: (state: InitialStateRes) => {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
});

export const {
  addToCart,
  cartTotal,
  removeFromCart,
  increase,
  decrease,
  clearCart,
} = shopSlice.actions;
export default shopSlice.reducer;
