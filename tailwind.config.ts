import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Geist Mono'", ...fontFamily.mono],
      },
    },
  },
  safelist: [
    "bg-red-500",
    "bg-red-400",
    "bg-red-300",
    "bg-red-200",
    "bg-red-100",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-gray-500",
    "cursor-pointer",
  ],
  plugins: [],
} satisfies Config;
