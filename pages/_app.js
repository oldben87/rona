import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import "../styles/globals.css"
import theme from "../styles/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
