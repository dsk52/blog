/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#252525",
        },
        white: {
          DEFAULT: "#dedede",
        },
      },
      transitionDuration: {
        400: "400ms",
      },
      lineHeight: {
        DEFAULT: 1,
      },
      borderWidth: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
