module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      'sm': '430px',
      // => @media (min-width: 430px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    fontFamily: {
      inter: ['"Inter", sans']
    },
    extend: {},
  },
  plugins: [],
}
