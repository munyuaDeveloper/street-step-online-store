import { createSlice } from "@reduxjs/toolkit";
import { CartInterface } from "../interfaces/interface";

interface CartSliceInterface {
  totalAmount: number;
  count: number;
  cart: CartInterface[];
}
const initialState = {
  totalAmount: 0,
  count: 0,
  cart: [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state: CartSliceInterface, action) => {
      const index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index === -1) {
        // If the product is not in the cart, add it with a quantity of 1
        state.cart.push({ ...action.payload, quantity: 1 });
      } else {
        // If the product is already in the cart, increase its quantity
        state.cart[index].quantity += 1;
      }

      // Update the count and totalAmount
      state.count = countTotalProducts(state.cart);
      state.totalAmount = calculateCartTotal(state.cart);
    },
    removeItem: (state: CartSliceInterface, action) => {
      const updatedItems = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = updatedItems;
      state.count = countTotalProducts(state.cart);
      state.totalAmount = calculateCartTotal(state.cart);
    },
    reduceQuantity: (state: CartSliceInterface, action) => {
      const index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else {
        const updatedItems = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        state.cart = updatedItems;
      }
      state.count = countTotalProducts(state.cart);
      state.totalAmount = calculateCartTotal(state.cart);
    },
  },
});

const calculateCartTotal = (cart: CartInterface[]) => {
  return cart.reduce((total, product) => {
    return total + product.sellingPrice * product.quantity;
  }, 0);
};

const countTotalProducts = (cart: CartInterface[]) => {
  return cart.reduce((totalCount, product) => {
    return totalCount + product.quantity;
  }, 0);
};

export const { addItem, removeItem, reduceQuantity } = CartSlice.actions;

export default CartSlice.reducer;
