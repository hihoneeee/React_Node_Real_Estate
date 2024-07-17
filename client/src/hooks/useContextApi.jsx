import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children, current }) => {
  return (
    <UserContext.Provider value={current}>
      {children}
    </UserContext.Provider>
  );
};
