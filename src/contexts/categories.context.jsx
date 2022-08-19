import { createContext, useState, useEffect } from 'react';

// This is for uploading the data to firestore only once
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
//import SHOP_DATA from '../shop-data.js';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

// The actual value we want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // This will run only once to upload the data to the db
  // useEffect(() => {
  //   // This will upload the data to the db with the name of "categories" and with the objects of SHOP_DATA
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    // If we want to use an async functiuon from elsweher, we need to create an anonymous async function inside useEffect, instead passing it through an argument
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log('getting the data from the db...', categoryMap);
      setCategoriesMap(categoryMap);
    };

    // Then we need to invoke the async func
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
