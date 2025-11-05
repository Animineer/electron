import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [category, setcategory] = useState("All");
  return (
    <ProductContext.Provider value={{ category, setcategory }}>
      {children}
    </ProductContext.Provider>
  );
}


