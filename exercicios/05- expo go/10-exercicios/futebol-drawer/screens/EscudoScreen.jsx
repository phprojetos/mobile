import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

const time = {
  nome: "Flamengo",
  escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
};

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Title>{time.nome}</Title>
      <Image source={{ uri: time.escudo }} style={styles.escudo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  escudo: { width: 200, height: 200, resizeMode: 'contain' },
});
