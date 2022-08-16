import { createContext, useEffect, useState } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// The actual value we want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// The actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //console.log('authStateChanged:', user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // We can get or set the value from any children component
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// IMPORTANT NOTE
// Every component that "uses" the provided context value, even if the component doesn't do anything with it, the copmponent code will be executed again
