import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../Firebase';

import HomeScreen from './HomeScreen';
import FormScreen from './FormScreeen';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const { user } = useAuth();

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
            paddingVertical: 5
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
            } else if (route.name === 'Sign In') {
              return (
                <Ionicons name="log-in" size={size} color={color} />
              )
            } else if (route.name === 'Sign Up') {
              return (
                <Ionicons name="log-out" size={size} color={color} />
              )
            }
          }
        })}
      >
        { user && <Tab.Screen name="Lista de Produtos" component={HomeScreen} options={{ headerShown: false }} />}
        { user && <Tab.Screen name="Cadastrar Produtos" component={FormScreen} options={{ headerShown: false }} />}

        {!user && <Tab.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />}
        {!user && <Tab.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation