import { createContext, useState } from 'react';

import SHOP_DATA from '../shop-data.js';

// The actual value we want to access
export const ProductsContext = createContext({
  //   setProducts: () => null,
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
