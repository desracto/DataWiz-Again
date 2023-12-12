// AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState(null);

  const login = (accountType) => {
    setLoggedIn(true);
    setAccountType(accountType);
  };

  const logout = () => {
    setLoggedIn(false);
    setAccountType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
