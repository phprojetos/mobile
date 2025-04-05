import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'
import Jogador from './Jogador'

export default function Time(props) {

  const { nome, anoFundacao, mascote, imagem,jogadores } = props

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={nome} subtitle={anoFundacao} />
      <Card.Content>
        <Text>{mascote}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: imagem }} />
      <Card.Actions>
        <FlatList
          horizontal
          data={jogadores}
          renderItem={({ item }) => (
            <Jogador
              nome={item.nome}
              numero={item.numero}
              imagem={item.imagem}
            />
          )}
        />
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({})