import { useLang } from "./context/LangContext";

const palette = {
  crust: "#11111b",
  mantle: "#181825",
  base: "#1e1e2e",
  surface0: "#313244",
  surface1: "#45475a",
  overlay0: "#6c7086",
  overlay1: "#7f849c",
  subtext0: "#a6adc8",
  subtext1: "#bac2de",
  ctpText: "#cdd6f4",

  neutralLight: "#f5f5f5",
  neutralSubtle: "#f3f4f6",
  neutralMuted: "#e2e2e8",
  neutralBorder: "#e5e7eb",
  neutralBorderSoft: "#cdd6f4",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",

  ink: "#1a1a2e",
  white: "#ffffff",
  gold: "#f5c518",
  goldDim: "#c9a43a",
  goldSoft: "rgba(245,197,24,0.1)",

  linkedin: "#0077b5",
} as const;

export interface ThemeColors {
  bg: {
    page: string;
    elevated: string;
    muted: string;
    subtle: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    faint: string;
    inverse: string;
    onAccent: string;
  };
  border: {
    default: string;
    subtle: string;
  };
  accent: {
    gold: string;
    goldSoft: string;
    goldDim: string;
  };
  brand: {
    ink: string;
    inkContrast: string;
  };
  external: {
    linkedin: string;
  };
  icon: {
    default: string;
    hover: string;
  };
}

export const getColors = (dark: boolean): ThemeColors => ({
  bg: {
    page: dark ? palette.crust : palette.neutralLight,
    elevated: dark ? palette.mantle : palette.white,
    muted: dark ? palette.base : palette.neutralMuted,
    subtle: dark ? palette.base : palette.neutralSubtle,
  },
  text: {
    primary: dark ? palette.ctpText : palette.ink,
    secondary: dark ? palette.subtext1 : palette.gray600,
    muted: dark ? palette.subtext0 : palette.gray500,
    faint: palette.gray400,
    inverse: dark ? palette.crust : palette.white,
    onAccent: palette.ink,
  },
  border: {
    default: dark ? palette.surface0 : palette.neutralBorder,
    subtle: dark ? palette.base : palette.neutralSubtle,
  },
  accent: {
    gold: palette.gold,
    goldSoft: palette.goldSoft,
    goldDim: palette.goldDim,
  },
  brand: {
    ink: palette.ink,
    inkContrast: palette.white,
  },
  external: {
    linkedin: palette.linkedin,
  },
  icon: {
    default: dark ? palette.overlay0 : palette.gray500,
    hover: dark ? palette.ctpText : palette.ink,
  },
});

export const useThemeColors = (): ThemeColors => {
  const { dark } = useLang();
  return getColors(dark);
};

export { palette };
