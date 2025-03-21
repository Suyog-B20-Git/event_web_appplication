/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from 'tailwind-scrollbar-hide'
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      screens: {
        'xs': '480px', // for extra small screens
        'sm': '640px', // Default small screen 
        'md': '768px', // Default medium screen
        'lg': '1024px', // Default large screen 
        'xl': '1280px', // Default extra large screen 
        '2xl': '1536px', // Default 2x extra large screen 
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
