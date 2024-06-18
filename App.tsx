import Navigation from "./src/navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "styled-components/native";
import { theme } from './src/styles/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
