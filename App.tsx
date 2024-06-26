import Navigation from "./src/navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "styled-components/native";
import { theme } from './src/styles/theme'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";


function sleep(ms : number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(3000);
  await SplashScreen.hideAsync();
}

export default function App() {
  
  useEffect(() => {
    delay_splash();
  },[])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}
