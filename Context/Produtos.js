import { useState, createContext } from 'react';

export const CommonContext = createContext();

export default CommonProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  return (
    <CommonContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </CommonContext.Provider>
  )
};