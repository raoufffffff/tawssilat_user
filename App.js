import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/stor/stor'
import Navigation from './src/navigation/Navigation';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView
        className="flex-1  bg-white"
      >
        <StatusBar style='auto' />

        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}


