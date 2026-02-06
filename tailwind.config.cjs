/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sboom: {
          orange: "#F56416",
          yellow: "#FBBA16",
          beige: "#EAD2AC",
          light: "#FAF4DE",
          black: "#0C0C0C",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        punch: "0 10px 0 0 rgba(12,12,12,0.22)",
      },
      borderRadius: {
        blob: "28px",
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "Segoe UI", "Inter", "Arial"],
      },
    },
  },
  plugins: [],
};
