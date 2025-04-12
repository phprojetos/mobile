import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import EscudoScreen from './screens/EscudoScreen';
import JogadoresScreen from './screens/JogadoresScreen';
import TitulosScreen from './screens/TitulosScreen';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>

          {/* EscudoScreen */}
          <Tab.Screen
            name='EscudoScreen'
            component={EscudoScreen}
            options={{
              title: 'Escudo',
              tabBarIcon: ({ color, size }) => <Ionicons name='shield' color={color} size={size} />
            }}
          />

          {/* JogadoresScreen */}
          <Tab.Screen
            name='JogadoresScreen'
            component={JogadoresScreen}
            options={{
              title: 'Jogadores',
              tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />
            }}
          />


          {/* TitulosScreen */}
          <Tab.Screen
            name='TitulosScreen'
            component={TitulosScreen}
            options={{
              title: 'Titulos',
              tabBarIcon: ({ color, size }) => <Ionicons name='trophy' color={color} size={size} />
            }}
            />

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}