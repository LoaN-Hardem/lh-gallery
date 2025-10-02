// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e40af", // azul principal
          light: "#60a5fa", // azul claro
          dark: "#1e3a8a", // azul mais escuro
        },
        brandDark: {
          DEFAULT: "#1e3a8a", // azul principal
          light: "#60a5fa", // azul claro
          dark: "000000", // azul mais escuro
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
