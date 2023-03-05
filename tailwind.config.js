/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/admin/src/**/*.{html,ts}',
    './projects/lp/src/**/*.{html,ts}',
    './projects/web/src/**/*.{html,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
