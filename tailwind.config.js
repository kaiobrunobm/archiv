const { colors } = require('@/src/theme/nativewind.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'], 
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        roboto: ['Roboto'],
        'roboto-semibold': ['Roboto-Semibold', 'sans-serif'],
        bbhBartle: ['BBHSans']
      },
      colors: colors,
    }
  },
  plugins: [
  ]
};
