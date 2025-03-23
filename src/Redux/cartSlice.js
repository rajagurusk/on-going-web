import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    orders: [], // ✅ Store order history
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, itemImage, itemTitle, price } = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the item with quantity 1
        state.cartItems.push({ id, itemImage, itemTitle, price, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        // Decrease the quantity if greater than 1
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        // If quantity is 1, remove the item
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload); // ✅ Store completed order
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  addOrder,
  clearOrders,
} = cartSlice.actions;
export default cartSlice.reducer;
