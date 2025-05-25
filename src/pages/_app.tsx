import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider, useMantineColorScheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import { Toaster } from "react-hot-toast";
import GlobalStyle from "../constants/globalStyle";
import useConfig from "../store/useConfig";

const theme = createTheme({
  autoContrast: true,
  fontSmoothing: false,
  respectReducedMotion: true,
  cursorType: "pointer",
  fontFamily:
    'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  defaultGradient: {
    from: "#388cdb",
    to: "#0f037f",
    deg: 180,
  },
  primaryShade: 8,
  colors: {
    brightBlue: [
      "#e6f2ff",
      "#cee1ff",
      "#9bc0ff",
      "#649dff",
      "#3980fe",
      "#1d6dfe",
      "#0964ff",
      "#0054e4",
      "#004acc",
      "#003fb5",
    ],
  },
  radius: {
    lg: "12px",
  },
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
  },
});

function JsonCrack({ Component, pageProps }: AppProps) {
  
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  return (
    <>
      <MantineProvider
        defaultColorScheme={darkmodeEnabled ? 'dark' : 'light'}
        theme={theme}>
          <Toaster
            position="bottom-right"
            containerStyle={{
              bottom: 34,
              right: 8,
              fontSize: 14,
            }}
            toastOptions={{
              style: {
                background: "#4D4D4D",
                color: "#B9BBBE",
                borderRadius: 4,
              },
            }}
          />
          <GlobalStyle />
          <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default JsonCrack;
