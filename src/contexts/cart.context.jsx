import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  items: [],
  isOpened: false,
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const value = { items, setItems, isOpened, setIsOpened };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
