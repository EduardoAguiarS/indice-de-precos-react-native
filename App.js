import { SafeAreaView } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { useState } from 'react';

import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreeen';

export default function App() {
  return (
    <SafeAreaView>
      <HomeScreen />
      <FormScreen />
    </SafeAreaView>
  );
}