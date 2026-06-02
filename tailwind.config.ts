import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ef",
        ink: "#231f20",
        tomato: "#f36b4f",
        mango: "#ffb84d",
        mint: "#7bdcb5"
      },
      boxShadow: {
        soft: "0 16px 50px rgba(35, 31, 32, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
