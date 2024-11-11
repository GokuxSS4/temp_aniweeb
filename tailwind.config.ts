import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8000b0", 
        secondary: "#0051bc",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-20": "rgba(238, 238, 238, 0.2)",
      },
    },
  },
  plugins: [require('@vidstack/react/tailwind.cjs')],
};

export default config;
