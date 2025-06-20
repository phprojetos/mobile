import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import FuncionariosScreen from '../screens/FuncionariosScreeen';
import CandidatosScreen from '../screens/CandidatosScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Funcionários" component={FuncionariosScreen} />
      <Stack.Screen name="Candidatos" component={CandidatosScreen} />
    </Stack.Navigator>
  );
}

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
}
