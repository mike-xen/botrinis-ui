/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require('daisyui')],
  theme: {
    fontFamily: {
      sans: ['Inter'],
      serif: ['Noto Serif'],
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#CCA129",
          "secondary": "#822308",
          "accent": "#B0AFAF",
          "neutral": "#000000",
          "base-100": "#ffffff",


        },

      },
    ],
  },
}

