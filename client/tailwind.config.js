/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          background: '#ffffff', // White
          text: '#1a1a1a', // Dark gray
          accent: '#1DA1F2', // Standard blue
        },
        // Dark theme colors
        dark: {
          background: '#1e1e1e', // Dark gray 
          text: '#f5f5f5', // Light gray
          accent: '#1DA1F2', // Standard blue
        },
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'], // Default font
      mono: ['Roboto Mono', 'monospace'], // Monospace font
      accent: ['Poppins', 'sans-serif'], // Accent font
    },
  },
  plugins: [],
};