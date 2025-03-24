module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}', // If you're using the app directory
    ],
    theme: {
      extend: {colors: {
        brown: {
          100: '#d9c2a6', // light brown
          200: '#b08e5e', // medium brown
          300: '#A38550', // dark brown (you can change this)
        },},},
    },
    plugins: [],
  };
  