const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
      './src/**/*/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      'xxs': '376px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          },
        },
        '.btn-green': {
          backgroundColor: 'green',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'limegreen'
          },
        },
      })
    })
  ],
}

