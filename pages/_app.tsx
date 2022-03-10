import type { AppProps } from "next/app";
import { lightTheme } from "../themes";
import { ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr";


import "../styles/globals.css";
import { UiProvider } from '../context/ui/UiProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  );
}

export default MyApp;
