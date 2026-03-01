/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF9933',
        secondary: '#FFCC00',
        background: '#FFF5E6',
        text: '#4A2C00',
        lightText: '#8B5A2B',
        accent: '#D9534F',
        border: '#E6C200',
      }
    },
  },
  plugins: [],
}
