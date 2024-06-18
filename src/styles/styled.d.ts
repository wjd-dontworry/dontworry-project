import 'styled-components/native'
import { Color } from './theme'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    color: {[key in Color]: string}
  }
}