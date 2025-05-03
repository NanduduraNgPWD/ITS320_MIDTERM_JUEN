// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Make sure Angular components are included
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ['Onest', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
