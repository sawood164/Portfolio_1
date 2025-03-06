/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        shine: "shine 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      boxShadow: {
        neo: "20px 20px 60px #1a1b1f, -20px -20px 60px #24272c",
        "neo-inset":
          "inset 20px 20px 60px #1a1b1f, inset -20px -20px 60px #24272c",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
      },
      fontSize: {
        "body-sm": ["0.9375rem", "1.5rem"],
        "body-base": ["1rem", "1.625rem"],
        "body-lg": ["1.125rem", "1.75rem"],
        "display-sm": ["1.875rem", "2.25rem"],
        "display-base": ["2.25rem", "2.75rem"],
        "display-lg": ["3rem", "3.5rem"],
        "display-xl": ["3.75rem", "4.25rem"],
      },
      letterSpacing: {
        heading: "-0.02em",
        display: "-0.03em",
      },
    },
  },
  plugins: [],
};
