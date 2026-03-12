/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#d1b06b", // Sofisticado Ouro Velho/Champanhe
        "primary-hover": "#b59656",
        "background-light": "#fcfbfa", // Off-white quente e refinado
        "background-dark": "#121212", // Elegante Off-Black em vez de Azul Marinho 
        "surface-dark": "#1a1a1a", // Tom levemente mais claro que o fundo
        "surface-border": "#333333", // Bordas sutis
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"],
        "serif": ["Playfair Display", "serif"],
        "body": ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
