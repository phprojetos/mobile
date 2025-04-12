import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const titulos = [
  { nome: "Campeonato Brasileiro", anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020] },
  { nome: "Copa Libertadores da América", anos: [1981, 2019, 2022] },
  { nome: "Copa do Brasil", anos: [1990, 2006, 2013, 2022, 2024] },
  { nome: "Supercopa do Brasil", anos: [2020, 2021, 2025] },
];

const TitulosScreen = () => {
  return (
    <FlatList
      data={titulos}
      keyExtractor={(item) => item.nome}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{item.nome}</Text>
            <Text variant="bodyMedium">Anos: {item.anos.join(', ')}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 10 },
  card: { marginBottom: 16 }
});

export default TitulosScreen;
