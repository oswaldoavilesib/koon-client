import type { AppProps } from "next/app";
import { lightTheme } from "../themes";
import { ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr";
import { UiProvider,CartProvider } from "../context";
import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </SWRConfig>
  );
}

export default MyApp;
