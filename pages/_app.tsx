import type { AppProps } from "next/app";
import { lightTheme } from "../themes";
import { ThemeProvider } from "@mui/material";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
