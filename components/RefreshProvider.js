import React, { createContext, useState, useContext } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const triggerRefresh = () => {
    setRefreshTrigger(true);
    // Reset trigger setelah beberapa saat jika perlu
    setTimeout(() => setRefreshTrigger(false), 1000);
  };

  return (
    <RefreshContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
