/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        got: ['GoT, ui-serif'],
        primary: ['Inter', 'ui-sans-serif, system-ui'],
      },
    },
  },
  plugins: [],
};
