import { DefaultTheme } from 'styled-components/native'

const color = {
  main: '#ffbe98',
  sub: '#ff8741',
  white: '#ffffff'
};

const fontSize = {
  title: 20,
  subTitle: 16,
  text: 14,
};

export type Color = keyof typeof color
export type FontSizeTypes = typeof fontSize;

export const theme: DefaultTheme = {
  color,
  fontSize,
};