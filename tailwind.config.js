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
        primary: "#002FA7", // Klein Blue
        hilbert: "#050505", // Hilbert Black
        text: "#E5E7EB",    // Light gray for primary text
        muted: "#9CA3AF",   // Muted text
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
