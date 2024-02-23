import { BottomNavigation } from 'react-native-paper';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import HomeScreen from './HomeScreen';
import FormScreen from './FormScreeen';

const Navigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Lista de Produtos', icon: 'cart' },
    { key: 'form', title: 'Cadastrar Produto', icon: 'plus-box' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    form: FormScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bar}
      activeColor="#d58500"
    />
  );
}

export default Navigation

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#003761',
  }
})