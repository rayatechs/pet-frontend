/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: '#F6685E',
        secondary: '#0A36BF',
        tertiary: '#D5709C',
        brownie: '#1F1816',
        milk: {
          100: '#FAFAFA',
          200: '#FAEFE9',
        },
      }
    },
  },
  plugins: [],
}

