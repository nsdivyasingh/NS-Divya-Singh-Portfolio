import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#E10600",
        primaryRedDark: "#B00000",
        primaryRedDeep: "#7D0000",
        warmOffWhite: "#F8F6F3",
        lightBeige: "#EFE8E2",
        textPrimary: "#111827",
        textSecondary: "#374151",
        accentRed: "#C40000",
        cardWhite: "#FFFFFF",
        cardOffWhite: "#FAFAFA",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
