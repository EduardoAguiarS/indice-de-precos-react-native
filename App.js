import { StyleSheet } from 'react-native';
import { useState } from 'react';

import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreeen';
import Navigation from './components/Navigation';

import ProductsProvider from './Context/Produtos';

const App = () => {

  return (
    <ProductsProvider>
      <Navigation />
    </ProductsProvider>
  );
}

export default App