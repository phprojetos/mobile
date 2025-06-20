import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import StackRoutes from './routes/StackRoutes';


export default function App() {
  return (
    <PaperProvider>
        <StackRoutes />
    </PaperProvider>

  );
}
