import React, { useCallback, useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import Navigation from "./src/navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "styled-components/native"
import { theme } from "./src/styles/theme"
import { Provider } from "react-redux"
import store from "./src/redux/store"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Pretendard: require("./src/assets/fonts/Pretendard.ttf"),
          "LINE Seed Sans KR": require("./src/assets/fonts/LINESeedKR-Bd.ttf"),
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

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
