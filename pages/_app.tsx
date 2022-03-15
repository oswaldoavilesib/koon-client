import type { AppProps } from "next/app";
import { lightTheme } from "../themes";
import { ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr";
import { UiProvider, CartProvider, AuthProvider } from "../context";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (

    
    <SessionProvider>
              <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
