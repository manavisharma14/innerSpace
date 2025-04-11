export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'fade-bounce': 'fadeBounce 0.6s ease-in-out',
      },
      keyframes: {
        fadeBounce: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
