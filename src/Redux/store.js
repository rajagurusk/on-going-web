import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage) // Import necessary functions


const persistConfig = {
  key: 'root', // Key for storing the state
  storage, // Default storage is localStorage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer, // Use the persisted reducer

  },
});

// Create a persistor to persist the state
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor