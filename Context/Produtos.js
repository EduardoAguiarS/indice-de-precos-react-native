import { useState, createContext } from 'react';

export const ProductsContext = createContext();

export default ProductsProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  return (
    <ProductsContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProductsContext.Provider>
  )
};