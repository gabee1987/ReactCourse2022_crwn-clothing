import { createContext, useEffect, useState } from 'react';

import {
  onAuthStateChangedListener,
  signOutUser,
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

  // Need to sign out manually because sign in data remains even between page refreshes
  //signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log('authStateChanged:', user);
    });

    return unsubscribe;
  }, []);

  // We can get or set the value from any children component
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// IMPORTANT NOTE
// Every component that "uses" the provided context value, even if the component doesn't do anything with it, the copmponent code will be executed again
