import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      itemImage: "/Fruits & Vegetables/Watermelon.png",
      itemTitle: "Organic Watermelon",
      price: "50.00",
    },
    {
      id: 2,
      itemImage: "/Fruits & Vegetables/Tomato.png",
      itemTitle: "Fresh Tomato",
      price: "20.00",
    },
    {
      id: 3,
      itemImage: "/Fruits & Vegetables/Mushroom.png",
      itemTitle: "Natural Mushroom",
      price: "25.00",
    },
    {
      id: 4,
      itemImage: "/Fruits & Vegetables/Broccoli.png",
      itemTitle: "Natural Broccoli",
      price: "30.00",
    },
    {
      id: 5,
      itemImage: "/Fruits & Vegetables/Corn.png",
      itemTitle: "Sweet Corn",
      price: "10.00",
    },
    {
      id: 6,
      itemImage: "/Fruits & Vegetables/Asparagus.png",
      itemTitle: "Organic Asparagus",
      price: "20.00",
    },
    {
      id: 7,
      itemImage: "/Fruits & Vegetables/Onion.png",
      itemTitle: "Organic Onion",
      price: "30.00",
    },
    {
      id: 8,
      itemImage: "/Fruits & Vegetables/Carrot.png",
      itemTitle: "Fresh Carrots",
      price: "20.00",
    },
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
