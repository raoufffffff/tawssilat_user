import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/stor/stor'
import Navigation from './src/navigation/Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor='#FC6011' style='light' />
      <SafeAreaView
        className="flex-1  "
      >
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}


