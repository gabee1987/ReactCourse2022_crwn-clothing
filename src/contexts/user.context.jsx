import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// The actual value we want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  console.log('dispatched');
  console.log('reducer action: ', action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, // Spread all the current values of the user
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// The actual component
export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null); // Old content values before reducer

  // const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); // with dispacth we can run the action of the reducer
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log('currentUser in context:', currentUser);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

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
