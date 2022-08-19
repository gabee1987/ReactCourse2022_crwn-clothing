import { createContext, useState, useEffect } from 'react';

//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
//import SHOP_DATA from '../shop-data.js';

// The actual value we want to access
export const ProductsContext = createContext({
  //   setProducts: () => null,
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // This will run only once to upload the data to the db
  // useEffect(() => {
  //   // This will upload the data to the db with the name of "categories" and with the objects of SHOP_DATA
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
