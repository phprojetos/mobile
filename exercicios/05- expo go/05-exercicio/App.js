import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  function alerta(){
    alert("Gol do Rodrygo!")
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontStyle: 'italic' }}>Rodrygo Goes</Text>
      <StatusBar />
      <Image
      source={{
        uri:"https://static.ndmais.com.br/2022/12/lateral-rodrigo-4.jpeg"
      }}
      style={{
        height:200,
        width:200
      }}
      />
     <Text style={styles.info}>
          Nome completo: Rodrygo Silva de Goes{"\n"}
        </Text>
      <Image
      source={{
        uri:"https://cdn.folhape.com.br/img/c/1200/900/dn_arquivo/2022/11/whatsapp-image-2022-11-29-at-161303.jpeg"
      }}
      style={{
        height:200,
        width:200
      }}
      />
       <Text style={styles.info}>Data de nascimento: 9 de janeiro de 2001{"\n"}</Text>
      <Image
      source={{
        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0iiwdn4BWh9Ere3qlpMH3iDqH5x_W66k7og&s"
      }}
      style={{
        height:200,
        width:200
      }}
      />
      <Text style={styles.info}>Nacionalidade: Brasileiro{"\n"}</Text>
      <Image
      source={{
        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUgKyHXcTe7d8UBWt3ojceAAtEF5WfxjYY-Q&s"
      }}
      style={{
        height:200,
        width:200
      }}
      />
      <Text style={styles.info}>Clube: Real Madrid{"\n"}</Text>
      <Image
      source={{
        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOa5ohR7JqrIah2WYYbHGytmXQJrkqePx43Q&s"
      }}
      style={{
        height:200,
        width:200
      }}
      />
      <Text style={styles.info}>Posição: Atacante{"\n"}</Text>
      <Button title='Gol' onPress={alerta}></Button>
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
