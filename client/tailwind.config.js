/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

