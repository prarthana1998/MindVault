module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // If you're using the app directory
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#d9c2a6',  // Soft Tan  
          200: '#b68f6a',  // Warm Medium Brown  
          300: '#a47148',  // Muted Earthy Brown  
          400: '#99582a',  // Rich Copper Brown  
          500: '#7d4521',  // Deep Chestnut Brown  
          600: '#62361b',  // Dark Mocha Brown  
          700: '#432818',  // Espresso Brown  
        },
      },
    },
  },
  plugins: [],
};
