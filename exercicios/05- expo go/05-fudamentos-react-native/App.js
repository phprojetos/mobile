import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './components/PrimeiroComponente'
import SegundoComponente from './components/SegundoComponente'
import TerceiroComponente from './components/TerceiroComponente';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PrimeiroComponente/>
      <SegundoComponente/>
      <TerceiroComponente/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
