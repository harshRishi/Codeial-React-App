// The Context in react is used to share data between nested
//  components without passing it as props.
import { createContext } from 'react';
import { useProvideAuth } from '../hooks';

// initial state of App
const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  signup: () => {},
};

export const AuthContext = createContext(initialState);
// console.log(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  // what is AuthContext.Providers
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
