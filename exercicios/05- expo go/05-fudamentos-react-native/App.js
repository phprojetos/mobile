import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './components/PrimeiroComponente'
import SegundoComponente from './components/SegundoComponente';
import TerceiroComponente from './components/TerceiroComponente';
import JavascriptComponente from './components/JavascriptComponente';
import Perfil from './components/Perfil';

export default function App() {


  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <PrimeiroComponente />
      <SegundoComponente />
      <TerceiroComponente />
      <JavascriptComponente />

      <Perfil
        nome="Gustavo"
        idade={20}
        email="gustavo@gmail.com"
      />

      <Perfil
        nome="João"
        idade={30}
        email="joao@gmail.com"
      />

      <Perfil
        nome="Maria"
        idade={40}
        email="maria@gmail.com"
      />

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});