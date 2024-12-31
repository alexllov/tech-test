/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "harker-purple": {
          DEFAULT: "#842BD2",
          modified: "#a451ed",
        },
        "harker-background": {
          light: "#f8f2f6",
          dark: "#f3ecf1",
        },
      },
    },
  },
  plugins: [],
};
