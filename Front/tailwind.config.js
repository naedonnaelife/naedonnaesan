/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      cursor: {
        pointer: 'pointer',
        mango: 'url(/mango.png) 16 16, auto',
      },
      fontFamily: {
        jamsil: ['TheJamsil5Bold', 'sans-serif'],
        jamsilLight: ['TheJamsil3Regular'],
        jamsilMedium: ['TheJamsil4Medium'],
        chosun: ['ChosunSg'],
        chosunKg: ['ChosunKg'],
      },
      fontSize: {
        10: ['10px'],
        20: ['20px'],
        30: ['30px'],
      },
      colors: {
        white: '#FFFFFF',
        semiWhite: '#FAFBFD',
        black: '#000000',
        lightGray: '#E8E8E8',
        middleGray: `#9ca3af`,
        gray: '#D5D5D5',
        deepGray: '#C5C5C5',
        grayMiddle: '#8D8D95',
        grayMiddle2: '#797981',
        grayHover: '#464555',
        red: '#FF0505',
        mango: '#FFEC9D',
        mangoHover: '#FBF1D6',
        mangoHardHover: '#FFC83D',
        choco: '#403800',
        leaf: '#8EBE6D',
        carrot: '#FB8D75',
        dongButton: '#C9A48C',
        dongButtonHover: '#967967',
        sbWhite: '#F3F4F6',
        mainPeach : '#fcb69f ',
        centerPeach : '#ffecd2 ',
        mainRecommend:'#F7DAE2',
        centerRecommend:'#FFB6E6',
        mainBuilding:'#BC86FF',
        centerBuilding:'#E8D6FF',
        mainComparison:'#F6C4B9', 
        centerComparison:'#FADDD7',
        mainInformation:'#8DB3FF',
        centerInformation:'#CBC9FF',
        mainMy:'#8BEFB1',
        centerMy:'#D4F1EF',
        // 테스트
      },
      height: {
        'full-nav': 'calc(100vh - 50px)',
      },
      width: {
        'calc-7': 'calc(100vw / 7)',
        'calc-6': 'calc(100vw / 6)',
        'calc-5': 'calc(100vw / 5)',
        'calc-4': 'calc(100vw / 4)',
        'calc-3': 'calc(100vw / 3)',
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
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animated'),
  ],
};
