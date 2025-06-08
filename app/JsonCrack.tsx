'use client'

import React from "react";
import { createTheme, CSSVariablesResolver, MantineProvider } from "@mantine/core";
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
    '--node-text-color': lightTheme.NODE_COLORS.TEXT,
    '--node-key-color': lightTheme.NODE_COLORS.NODE_KEY,
    '--node-value-color': lightTheme.NODE_COLORS.NODE_VALUE,
    '--node-integer-color': lightTheme.NODE_COLORS.INTEGER,
    '--node-null-color': lightTheme.NODE_COLORS.NULL,
    '--node-true-color': lightTheme.NODE_COLORS.BOOL.TRUE,
    '--node-false-color': lightTheme.NODE_COLORS.BOOL.FALSE,
    '--node-array-parent-color': lightTheme.NODE_COLORS.PARENT_ARR,
    '--node-object-parent-color': lightTheme.NODE_COLORS.PARENT_OBJ,
    '--node-child-count-color': lightTheme.NODE_COLORS.CHILD_COUNT,
    '--node-divider-color': lightTheme.NODE_COLORS.DIVIDER,
    '--normal-text-color': lightTheme.TEXT_NORMAL,
    '--background-modifier-accent': lightTheme.BACKGROUND_MODIFIER_ACCENT,
    '--interactive-hover-color': lightTheme.INTERACTIVE_HOVER,
    '--interactive-normal-color': lightTheme.INTERACTIVE_NORMAL,
    '--bg-grid-color': lightTheme.GRID_BG_COLOR,
    '--primary-grid-color': lightTheme.GRID_COLOR_PRIMARY,
    '--grid-color-secondary': lightTheme.GRID_COLOR_SECONDARY,
    '--bg-node': lightTheme.BACKGROUND_NODE,
    '--positive-text-color': lightTheme.TEXT_POSITIVE,
  },
  dark: {
    '--toolbar-bg': darkTheme.TOOLBAR_BG,
    '--silver': darkTheme.SILVER,
    '--silver-dark': darkTheme.SILVER_DARK,
    '--node-text-color': darkTheme.NODE_COLORS.TEXT,
    '--node-key-color': darkTheme.NODE_COLORS.NODE_KEY,
    '--node-value-color': darkTheme.NODE_COLORS.NODE_VALUE,
    '--node-integer-color': darkTheme.NODE_COLORS.INTEGER,
    '--node-null-color': darkTheme.NODE_COLORS.NULL,
    '--node-true-color': darkTheme.NODE_COLORS.BOOL.TRUE,
    '--node-false-color': darkTheme.NODE_COLORS.BOOL.FALSE,
    '--node-array-parent-color': darkTheme.NODE_COLORS.PARENT_ARR,
    '--node-object-parent-color': darkTheme.NODE_COLORS.PARENT_OBJ,
    '--node-child-count-color': darkTheme.NODE_COLORS.CHILD_COUNT,
    '--node-divider-color': darkTheme.NODE_COLORS.DIVIDER,
    '--normal-text-color': darkTheme.TEXT_NORMAL,
    '--background-modifier-accent': darkTheme.BACKGROUND_MODIFIER_ACCENT,
    '--interactive-hover-color': darkTheme.INTERACTIVE_HOVER,
    '--interactive-normal-color': darkTheme.INTERACTIVE_NORMAL,
    '--bg-grid-color': darkTheme.GRID_BG_COLOR,
    '--primary-grid-color': darkTheme.GRID_COLOR_PRIMARY,
    '--grid-color-secondary': darkTheme.GRID_COLOR_SECONDARY,
    '--bg-node': darkTheme.BACKGROUND_NODE,
    '--positive-text-color': darkTheme.TEXT_POSITIVE
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