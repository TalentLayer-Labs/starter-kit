/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      midnight: '#fefcfa',
      endnight: '#FAE4CE',
      redpraha: '#f4dabe',
      yellowpraha: '#fff490',
      bluepraha: '#90f6ff',
      landingprimary: '#FF71A2',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
