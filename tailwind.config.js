/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      'hepta-bold': 'Hepta Bold',
      'hepta-extra-bold': 'Hepta Extra Bold',
      'hepta-black': 'Hepta Black',
      'hepta-regular': 'Hepta',
      'hepta-light': 'Hepta Light',
    },
    extend: {

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
}