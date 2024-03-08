/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jamsil : ['TheJamsil5Bold', 'sans-serif']
      },
      colors: {
        white : '#FFFFFF',
        black : '#000000',
        kakaoBlue : '#1A234E',
        kakaoYello : '#FFEB00'
      }
    },
  },
  plugins: [],
};
