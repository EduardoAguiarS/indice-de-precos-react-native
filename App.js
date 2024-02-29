import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './components/Navigation';
import Header from './components/common/Header';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="Índice de Preços Toledo" />
        <Navigation />
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