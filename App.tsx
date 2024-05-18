import Navigation from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
  );
}