'use client'

import React, { useEffect } from "react";
import { createTheme, CSSVariablesResolver, defaultCssVariablesResolver, MantineProvider, useMantineColorScheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import { Toaster } from "react-hot-toast";
import useConfig from "./_store/useConfig";
import { darkTheme, lightTheme } from "./_constants/theme";

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

const resolver: CSSVariablesResolver = (theme) =>({
  variables: {

  },
  light: {
    '--toolbar-bg': lightTheme.TOOLBAR_BG,
    '--silver': lightTheme.SILVER,    
    '--silver-dark': lightTheme.SILVER_DARK,
  },
  dark: {
    '--toolbar-bg': darkTheme.TOOLBAR_BG,
    '--silver': darkTheme.SILVER,
    '--silver-dark': darkTheme.SILVER_DARK
  }
})

export default function JsonCrack({ children }: {children: React.ReactNode}) {
  
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  return (
    <>
      <MantineProvider
        defaultColorScheme={darkmodeEnabled ? 'dark' : 'light'}
        theme={theme}
        cssVariablesResolver={resolver}>
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
          {children}
      </MantineProvider>
    </>
  );
}