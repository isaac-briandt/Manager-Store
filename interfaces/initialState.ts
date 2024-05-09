import { Manga } from "./manga";

export type InitialStateRes = {
  cartItems: Manga[];
  quantity: number;
  total: number;
};
