import { useLang } from "./context/LangContext";

const palette = {
  // Terminal dark (GitHub-dark inspired, neutral — no lavender tint)
  crust: "#0d1117",
  mantle: "#161b22",
  base: "#21262d",
  surface0: "#30363d",
  surface1: "#3d444d",
  overlay0: "#6e7681",
  overlay1: "#8b949e",
  subtext0: "#8b949e",
  subtext1: "#adbac7",
  ctpText: "#e6edf3",

  // Light — cool neutral (Tailwind zinc/slate, 2026 tech standard)
  neutralLight: "#fafafa",   // zinc-50
  neutralSubtle: "#f4f4f5",  // zinc-100
  neutralMuted: "#e4e4e7",   // zinc-200
  neutralBorder: "#e4e4e7",  // zinc-200
  neutralBorderSoft: "#f4f4f5",
  gray400: "#a1a1aa",        // zinc-400 (faint)
  gray500: "#52525b",        // zinc-600 (muted)
  gray600: "#3f3f46",        // zinc-700 (secondary)

  ink: "#18181b",            // zinc-900
  white: "#ffffff",

  // Accent green (GitHub Primer success) — primary
  gold: "#1a7f37",          // light-mode accent
  goldDim: "#176b2f",       // light-mode dimmed
  goldSoft: "rgba(26,127,55,0.1)",
  greenBright: "#3fb950",   // dark-mode accent (Primer success.fg)
  greenBrightDim: "#2ea043",
  greenSoftDark: "rgba(63,185,80,0.12)",

  // Amber (GitHub Primer attention) — secondary accent, used sparingly
  amber: "#9a6700",          // light-mode secondary
  amberDark: "#d29922",      // dark-mode secondary
  amberSoft: "rgba(154,103,0,0.1)",
  amberSoftDark: "rgba(210,153,34,0.14)",

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
    secondary: string;
    secondarySoft: string;
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
    gold: dark ? palette.greenBright : palette.gold,
    goldSoft: dark ? palette.greenSoftDark : palette.goldSoft,
    goldDim: dark ? palette.greenBrightDim : palette.goldDim,
    secondary: dark ? palette.amberDark : palette.amber,
    secondarySoft: dark ? palette.amberSoftDark : palette.amberSoft,
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
