/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-blue-primary)",
        secondary: "#1d8348",
        success: "#5cb85c",
        danger: "#F05252",
        bgHeader: '#38bdf8',
        textHeader: 'white',
        btn_Primary: "var(--color-blue-primary)",
        btn_Primary_hover: "var(--color-blue-hover)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        main: 'var(--color-bg)',
        overlay: 'rgba(0,0,0,0.5)'
      },
    },

  },
  plugins: [],
}