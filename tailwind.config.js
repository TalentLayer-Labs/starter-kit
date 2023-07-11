/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      midnight: '#0f172a',
      endnight: '#1e293b',
      redpraha: '#ff0050',
      yellowpraha: '#fff490',
      bluepraha: '#90f6ff',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
