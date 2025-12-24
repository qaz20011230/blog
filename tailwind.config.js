/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#4A90E2",
        text: "#333333",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#333333',
            a: {
              color: '#4A90E2',
              '&:hover': {
                color: '#357ABD',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
