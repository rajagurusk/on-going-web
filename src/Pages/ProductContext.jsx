import React, { createContext, useState, useEffect } from "react";

// Create Context
export const ProductContext = createContext();

// Load initial products from localStorage or use default data
const initialProducts = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    itemImage: "./public/Fruits & Vegetables/Watermelon.png",
    itemTitle: "Organic Watermelon",
    price: "50.00",
  },
  {
    id: 2,
    itemImage: "./public/Fruits & Vegetables/Tomato.png",
    itemTitle: "Fresh Tomato",
    price: "20.00",
  },
  {
    id: 3,
    itemImage: "./public/Fruits & Vegetables/Mushrom.png",
    itemTitle: "Natural Mushroom",
    price: "25.00",
  },
  {
    id: 4,
    itemImage: "./public/Fruits & Vegetables/Brocilli.png",
    itemTitle: "Natural Broccoli",
    price: "30.00",
  },
  {
    id: 5,
    itemImage: "./public/Fruits & Vegetables/Corn.png",
    itemTitle: "Sweet Corn",
    price: "10.00",
  },
  {
    id: 6,
    itemImage: "./public/Fruits & Vegetables/Asparagus.png",
    itemTitle: "Organic Asparagus",
    price: "20.00",
  },
  {
    id: 7,
    itemImage: "./public/Fruits & Vegetables/Onion.png",
    itemTitle: "Organic Onion",
    price: "30.00",
  },
  {
    id: 8,
    itemImage: "./public/Fruits & Vegetables/Carrot.png",
    itemTitle: "Fresh Carrots",
    price: "20.00",
  },
];

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  // Update localStorage when products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Function to update products (add, edit, delete)
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
