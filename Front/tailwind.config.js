/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jamsil: ['TheJamsil5Bold', 'sans-serif'],
        jamsilLight: ['TheJamsil3Regular']
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        lightGray: '#E8E8E8',
        gray: '#D5D5D5',
        grayHover: '#464555',
        red: '#FF0505',
        mango: '#FFEC9D',
        choco: '#403800',
        leaf: '#8EBE6D',
        carrot: '#FB8D75',
        dongButton: '#C9A48C',
        dongButtonHover: '#967967',

        // 테스트
      },
      height: {
        'full-nav': 'calc(100% - 75px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.flex-c': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.flex-cc': {
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.border-basic': {
          borderWidth: '2px',
          borderColor: '#D5D5D5',
          borderRadius: '0.375rem',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
