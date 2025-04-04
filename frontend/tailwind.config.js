/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      'monomakh': ['Monomakh', 'sans-serif'], // 'monomakh' is the name you'll use in your HTML
    },backgroundImage: {
      'hero-pattern': "url('/src/assets/Designer.png')",
    },},
  },
  plugins: [],
}

