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
          dark: '#1A2533',       // Um tom bem escuro do azul principal para contrastes (Rodapé/Topo fino)
          light: '#F5F7FA',      // Fundo do site (Branco gelo levemente azulado)
          primary: '#395070',    // A SUA COR ESCOLHIDA (Header/Botões principais)
          secondary: '#EAB308',  // Amarelo Dourado (Mantive para ofertas/destaques, combina bem com azul)
          text: '#2D3748',       // Cinza escuro para textos (melhor leitura que preto puro)
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
