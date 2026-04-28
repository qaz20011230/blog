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
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",
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
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        "border-glow-pulse": {
          "0%, 100%": { borderColor: "rgba(0, 47, 167, 0.1)", boxShadow: "0 0 0 0 rgba(0, 47, 167, 0)" },
          "50%": { borderColor: "rgba(0, 47, 167, 0.3)", boxShadow: "0 0 20px 0 rgba(0, 47, 167, 0.08)" },
        },
        "line-grow": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "progress-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
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
