import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function MegaSenaScreen() {
  const [jogoGerado, setJogoGerado] = useState([]);
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  function gerarJogo() {
    const novoJogo = [];
    while (novoJogo.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!novoJogo.includes(numero)) {
        novoJogo.push(numero);
      }
    }
    setJogoGerado(novoJogo);
    setJogosMegaSena([...jogosMegaSena, novoJogo]);
  }
  function resetarHistorico() {
    setJogosMegaSena([]);
  }
  

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Content>
          <Text variant="headlineSmall">Mega Sena:</Text>
          <Text variant="titleLarge">{jogoGerado.join(' - ')}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={gerarJogo}>Gerar Jogo</Button>
          <Button onPress={resetarHistorico}>Limpar Histórico</Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Card.Content>
          <Text variant="headlineSmall">Histórico de Jogos:</Text>
          {jogosMegaSena.map((jogo, index) => (
            <Text key={index}>{jogo.join(' - ')}</Text>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
