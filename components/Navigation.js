import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import FormScreen from './FormScreeen';

const Navigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer height="100%">
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginVertical: 5,
          },
          tabBarActiveBackgroundColor: '#003661',
          tabBarActiveTintColor: '#d58500',
          tabBarInactiveTintColor: '#ced2d6',
          tabBarInactiveBackgroundColor: '#003661',
          tabBarStyle: {
            backgroundColor: '#003661',
            height: 52,
            padding: 5
          },

          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Lista de Produtos') {
              return (
                <Ionicons name="list" size={size} color={color} />
              )
            } else if (route.name === 'Cadastrar Produtos') {
              return (
                <Ionicons name="cart" size={size} color={color} />
              )
            }
          }
        })}
      >
        <Tab.Screen name="Lista de Produtos" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Cadastrar Produtos" component={FormScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation