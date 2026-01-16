/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: '#FF7043',
        light: '#F0EFF4',
        dark: '#050A10',
        sutle: '#606062',
        ligthSutle: '#908F92',
        info: '#3482F0',
        surface: {
          light: '#F6F5F8'
        },
        border: {
          dark: '#908F92',
          light: '#C0BFC3',
          danger: '#EF233C'
        },
        background: {
          DEFAULT: '#F0EFF4',
          editor: '#FFFFFF'
        },
        button: {
          brand: '#FF7043',
          'brand-pressed': '#FF531F',
          'brand-disable': '#F8E6E5',

          apple: '#050A10',
          'apple-pressed': '#606062',
          'apple-disable': '#C0BFC3',

          google: '#F6F5F8',

          'ghost-pressed': '#F8E6E5',

          archive: '#3482F0',
          'archive-pressed': '#326AB7',

          delete: '#EF233C',
          'delete-pressed': '#BF1C30',

          'action-pressed': '#C0BFC3',

          danger: '#FEE9EC',

          'tab-active': '#F8E6E5',

          shadow: '#E9E8ED'
        },
        input: {
          DEFAULT: '#F6F5F8',
          error: '#EF233C'
        }
      }
    }
  },
  plugins: []
};
