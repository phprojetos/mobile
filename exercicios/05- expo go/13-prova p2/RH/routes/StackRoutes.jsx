import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import VagasScreen from '../screens/VagasScreen';
import CandidatosScreen from '../screens/CandidatosScreen';
import FucionariosScreen from '../screens/FuncionariosScreen';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Vagas"
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            drawerActiveTintColor: '#1ac6ca',
          }}
        >
          <Drawer.Screen
            name="Vagas"
            component={VagasScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="check-square" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Candidatos"
            component={CandidatosScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Entypo name="add-user" size={size} color={color} />
              ),
            }}
          />
            <Drawer.Screen
            name="Funcionarios"
            component={FucionariosScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="people" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
