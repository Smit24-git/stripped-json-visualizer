const fixedColors = {
  SILVER: "#B9BBBE",
};

const nodeColors = {
  dark: {
    NODE_COLORS: {
      TEXT: "#DCE5E7",
      NODE_KEY: "#59b8ff",
      NODE_VALUE: "#DCE5E7",
      INTEGER: "#e8c479",
      NULL: "#939598",
      BOOL: {
        FALSE: "#F85C50",
        TRUE: "#00DC7D",
      },
      PARENT_ARR: "#FC9A40",
      PARENT_OBJ: "#59b8ff",
      CHILD_COUNT: "white",
      DIVIDER: "#383838",
    },
  },
  light: {
    NODE_COLORS: {
      TEXT: "#000",
      NODE_KEY: "#761CEA",
      NODE_VALUE: "#535353",
      INTEGER: "#FD0079",
      NULL: "#afafaf",
      BOOL: {
        FALSE: "#FF0000",
        TRUE: "#748700",
      },
      PARENT_ARR: "#FF6B00",
      PARENT_OBJ: "#761CEA",
      CHILD_COUNT: "#535353",
      DIVIDER: "#e6e6e6",
    },
  },
};

export const darkTheme = {
  ...fixedColors,
  ...nodeColors.dark,
  SILVER_DARK: "#4D4D4D",
  INTERACTIVE_NORMAL: "#b9bbbe",
  INTERACTIVE_HOVER: "#dcddde",
  BACKGROUND_NODE: "#2B2C3E",
  TOOLBAR_BG: "#262626",
  BACKGROUND_MODIFIER_ACCENT: "rgba(79,84,92,0.48)",
  TEXT_NORMAL: "#dcddde",
  TEXT_POSITIVE: "hsl(139,calc(var(--saturation-factor, 1)*51.6%),52.2%)",
  GRID_BG_COLOR: "#141414",
  GRID_COLOR_PRIMARY: "#1c1b1b",
  GRID_COLOR_SECONDARY: "#191919",
};

export const lightTheme = {
  ...fixedColors,
  ...nodeColors.light,
  SILVER_DARK: "#CCCCCC",
  INTERACTIVE_NORMAL: "#4f5660",
  INTERACTIVE_HOVER: "#2e3338",
  BACKGROUND_NODE: "#F6F8FA",
  TOOLBAR_BG: "#ECECEC",
  BACKGROUND_MODIFIER_ACCENT: "rgba(106,116,128,0.24)",
  TEXT_NORMAL: "#2e3338",
  TEXT_POSITIVE: "#008736",
  GRID_BG_COLOR: "#f7f7f7",
  GRID_COLOR_PRIMARY: "#ebe8e8",
  GRID_COLOR_SECONDARY: "#f2eeee",
};

const themeDs = {
  ...lightTheme,
  ...darkTheme,
};

export default themeDs;
