/** @type {import('tailwindcss').Config} */

export default {
  darkMode: undefined,
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
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-light": "rgb(var(--color-accent-light) / <alpha-value>)",
        hilbert: "rgb(var(--color-bg) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        gray: {
          50: "rgb(var(--color-gray-50) / <alpha-value>)",
          100: "rgb(var(--color-gray-100) / <alpha-value>)",
          200: "rgb(var(--color-gray-200) / <alpha-value>)",
          300: "rgb(var(--color-gray-300) / <alpha-value>)",
          400: "rgb(var(--color-gray-400) / <alpha-value>)",
          500: "rgb(var(--color-gray-500) / <alpha-value>)",
          600: "rgb(var(--color-gray-600) / <alpha-value>)",
          700: "rgb(var(--color-gray-700) / <alpha-value>)",
          800: "rgb(var(--color-gray-800) / <alpha-value>)",
          900: "rgb(var(--color-gray-900) / <alpha-value>)",
        }
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "border-glow": "border-glow-pulse 3s ease-in-out infinite",
        "line-grow": "line-grow 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "progress-shimmer": "progress-shimmer 2s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'rgb(var(--color-text))',
            h1: { color: 'rgb(var(--color-gray-100))' },
            h2: { color: 'rgb(var(--color-gray-100))' },
            h3: { color: 'rgb(var(--color-gray-100))' },
            h4: { color: 'rgb(var(--color-gray-100))' },
            strong: { color: 'rgb(var(--color-gray-100))' },
            blockquote: { 
              color: 'rgb(var(--color-gray-300))',
              borderLeftColor: 'rgb(var(--color-primary))',
              backgroundColor: 'rgba(var(--color-primary) / 0.05)',
              padding: '1rem',
            },
            code: { color: 'rgb(var(--color-primary-light))' },
            a: {
              color: 'rgb(var(--color-primary))',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(var(--color-primary) / 0.3)',
              transition: 'border-color 0.2s',
              '&:hover': {
                color: 'rgb(var(--color-primary-light))',
                borderBottomColor: 'rgb(var(--color-primary-light))',
              },
            },
            hr: { borderColor: 'rgb(var(--color-gray-800))' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
