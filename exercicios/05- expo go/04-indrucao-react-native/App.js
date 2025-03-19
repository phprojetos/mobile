import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const nome = "thirrasgo"
  function alerta(){
    alert("clicou no botao")
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Text>Meu projeto teste {nome}</Text>
      <Image
      source={{
        uri:"https://s2-oglobo.glbimg.com/cdz6qJ-uQ1_A3xsoJbYBXluXy3c=/0x0:1324x883/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/P/V/W9YNsMS1GsZlXFZOOUMQ/110344267-fluminense-x-flamengo-campeonato-carioca-maracana-12-03-2025-82.-fotos-gilvan-de-sou-2-.jpg"
      }}
      style={{
        height:200,
        width:200
      }}
      />
      <Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      />
      <Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      /><Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      /><Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      /><Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      />
      <Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      />
      <Image
      source={ require('./imagens/image.png')
      }
      style={{
        height:200,
        width:200
      }}
      />

      <Text>Thiago baytola</Text>
      <Text>tirrasgo queima rosca</Text>
      <Text>flamengo</Text>
      <Text>Dificil</Text>
      <Button title='Clicar' onPress={alerta}></Button>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
