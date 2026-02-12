// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0C10',       // Fundo principal (quase preto)
          light: '#1F2833',      // Fundo secundário (cinza escuro azulado)
          primary: '#66FCF1',    // Cor de destaque (Ciano neon - bom para botões)
          secondary: '#45A29E',  // Cor de destaque secundária
          text: '#C5C6C7',       // Texto padrão (cinza claro para ler no escuro)
          white: '#FFFFFF'       // Texto destacado
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte limpa e moderna
      }
    },
  },
  plugins: [],
}
