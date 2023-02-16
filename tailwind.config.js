/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/web/src/**/*.{html,ts}',
    './projects/admin/src/**/*.{html,ts}',
    './projects/lp/src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
