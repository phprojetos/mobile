import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Filme(props) {

  const { nome, ano,diretor,temporadas, capa} = props

  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Serie</Text>

      <Text style={styles.texto}>NOME: {nome}</Text>
      <Text style={styles.texto}>ANO: {ano}</Text>
      <Text style={styles.texto}>DIRETOR: {diretor}</Text>
      <Text style={styles.texto}>TEMPORADAS: {temporadas}</Text>

      <Image
        source={{
          uri: capa
        }}
        style={{
          height: 300,
          width: 300
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    borderWidth: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  texto: {
    fontSize: 20,
    fontWeight: 600
  }
})