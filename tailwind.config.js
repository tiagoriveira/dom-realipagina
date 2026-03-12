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
        "primary": "#d4af35",
        "primary-hover": "#b89628",
        "background-light": "#f8f7f6",
        "background-dark": "#0f172a",
        "surface-dark": "#1e293b",
        "surface-border": "#334155",
      },
      fontFamily: {
        "display": ["Cinzel Decorative", "Playfair Display", "serif"],
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
