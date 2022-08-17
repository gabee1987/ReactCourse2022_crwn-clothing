import { createContext, useEffect, useState } from 'react';

import PRODUCTS from '../shop-data.json';

// The actual value we want to access
export const ProductsContext = createContext({
  //   setProducts: () => null,
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
