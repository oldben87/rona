import { theme as defaultTheme } from '@chakra-ui/core'

export default {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    transparent: 'transparent',
    grey: {
      50: '#f0f0fa',
      100: '#d1d3e1',
      200: '#b3b6c9',
      300: '#9499b4',
      400: '#777c9f',
      500: '#5d6385',
      600: '#484d69',
      700: '#34374b',
      800: '#1e212e',
      900: '#080b14',
    },
    red: {
      50: '#ffe1e1',
      100: '#ffb1b1',
      200: '#ff7f7f',
      300: '#ff4c4c',
      400: '#ff1a1a',
      500: '#e60000',
      600: '#b40000',
      700: '#810000',
      800: '#500000',
      900: '#210000',
    },
  },
}
