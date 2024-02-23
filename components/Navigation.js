import { BottomNavigation } from 'react-native-paper';
import { useState } from 'react';

import HomeScreen from './HomeScreen';
import FormScreen from './FormScreeen';

const Navigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'form', title: 'Form', icon: 'account' },
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
    />
  );
}

export default Navigation