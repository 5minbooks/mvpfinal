/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#4cb8a0',
          light: '#5fc8b3',
          lighter: '#a0e9c4',
        },
        accent: {
          sand: '#f4e1b8',
          coral: '#f9b6a4',
        },
      },
    },
  },
  plugins: [],
};