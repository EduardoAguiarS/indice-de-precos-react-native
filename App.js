import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreeen';
import Navigation from './components/Navigation';
import Header from './components/common/Header';

import ProductsProvider from './Context/Produtos';

const App = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ProductsProvider>
          <Header title="IPT" />
          <Navigation />
        </ProductsProvider>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#003761',
  }
})