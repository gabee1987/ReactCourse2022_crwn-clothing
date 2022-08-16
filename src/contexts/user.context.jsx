import { createContext, useState } from 'react';

// The actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// The actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // We can get or set the value from any children component
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// IMPORTANT NOTE
// Every component that "uses" the provided context value, even if the component doesn't do anything with it, the copmponent code will be executed again
