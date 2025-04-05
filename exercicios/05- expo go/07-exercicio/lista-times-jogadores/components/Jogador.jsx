import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

export default function Jogador(props) {

  const { nome,numero,imagem } = props

  return (
    <Card.Title
      title={nome}
      subtitle={`Numero ${numero}`}
      left={(props) => <Avatar.Image {...props} source={{ uri: imagem }} />}
    />
  )
}

const styles = StyleSheet.create({})