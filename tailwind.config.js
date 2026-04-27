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
        primary: "#002FA7",
        "primary-light": "#2563EB",
        hilbert: "#050505",
        text: "#E5E7EB",
        muted: "#9CA3AF",
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
            color: '#E5E7EB',
            h1: { color: '#F9FAFB' },
            h2: { color: '#F9FAFB' },
            h3: { color: '#F9FAFB' },
            h4: { color: '#F9FAFB' },
            strong: { color: '#F9FAFB' },
            blockquote: { 
              color: '#D1D5DB',
              borderLeftColor: '#002FA7',
              backgroundColor: 'rgba(0, 47, 167, 0.05)',
              padding: '1rem',
            },
            code: { color: '#93C5FD' },
            a: {
              color: '#002FA7',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,47,167,0.3)',
              transition: 'border-color 0.2s',
              '&:hover': {
                color: '#2563EB',
                borderBottomColor: '#2563EB',
              },
            },
            hr: { borderColor: '#1F2937' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
