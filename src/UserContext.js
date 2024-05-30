import React, { createContext, useContext, useRef } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nameRef = useRef(null);

  return (
    <UserContext.Provider value={{ nameRef }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
