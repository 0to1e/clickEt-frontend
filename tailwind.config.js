/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {colors:{
      primary:"#C00416",

      light_bg_primary:"#FBFEFB",
      dark_bg:"#130B0B",
      on_dark_bg:"#291E1E",
      error:"#D00000",
      suggestion:"#2E5EAA",
      success:"#2E933C",
      
    }},
  },
  plugins: [],
};
