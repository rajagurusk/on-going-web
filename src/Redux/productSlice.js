import { createSlice } from '@reduxjs/toolkit';

// Importing item data
import itemCard from '../assets/Data';

const initialState = {
  products: itemCard, // Initial products list from itemCard
  cart: [], // Initially empty cart
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Action to add a product to the cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in the cart
      } else {
        state.cart.push({ ...product, quantity: 1 }); // Add product to cart with initial quantity of 1
      }
    },

    // Action to remove a product from the cart
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    // Action to update a product's quantity in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },

    // Action to clear the cart
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Exporting actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = productSlice.actions;

// Exporting the reducer to be used in store
export default productSlice.reducer;
