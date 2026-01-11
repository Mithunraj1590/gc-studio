/** @type {import('tailwindcss').Config} */
const colors = {
  primary: {
    DEFAULT: "var(--primary)",
    100: "var(--primary-100)",
    500: "var(--primary-500)",
    900: "var(--primary-900)",
  },
  transparent: "var(--transparent)",

  success: {
    100: "#e7f5ed",
    500: "#34ab66",
    700: "#226f42",
  },
  error: {
    100: "#fce9ea",
    500: "#e72f3c",
    700: "#971e26",
  },
  white: {
    DEFAULT: "var(--white)",
    700: "var(--white-700)",
    500: "var(--white-500)",
    600: "var(--white-600)",
    800: "var(--white-800)",
  },
  black: "#000",

  secondary: "var(--secondary)",
  green: "var(--green)",
  yellow: "var(--yellow)",
  grey: "var(--grey)",
  turquoise: "var(--turquoise)",
  secondaryFooter: "var(--secondary-footer)",
  lightyellow: "var(--yellowlight)",
  lightblue: "var(--bluelight)",
};

const spacing = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
};

const borderRadius = {
  sm: "var(--radius-sm)",
  sm2: "var(--radius-sm2)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  full: "50%",
};

const fontSize = {
  base: "1rem",
  xs: [
    "var(--text-xs)",
    {
      lineHeight: "1.5",
      letterSpacing: "-0.01em",
      fontWeight: "500",
    },
  ],
  sm: [
    "var(--text-sm)",
    {
      lineHeight: "1.5",
      letterSpacing: "-0.01em",
      fontWeight: "500",
    },
  ],
  md: "var(--text-md)",
  lg: "var(--text-lg)",
  xl: "var(--text-xl)",
  h1: "var(--text-h1)",
  h2: "var(--text-h2)",
  h3: "var(--text-h3)",
  h4: "var(--text-h4)",
  h5: "var(--text-h5)",
  h6: "var(--text-h6)",
  p: "var(--text-p)",
};

const fontWeight = {
  regular: "400",
  bold: "700",
};

const boxShadow = {
  submenu: "0px 3px 2px 0px rgba(0, 64, 111, 0.03)",
  sm: "0px 3px 2px 0px rgba(0, 64, 111, 0.19)",
  md: "0px 3px 1px 0px rgba(217, 229, 239, 1)",
  hover: "0px 3px 1px 0px rgba(91, 183, 0, 1)",
  lg: "0px 8px 20px 0px rgba(18, 16, 99, 0.06)",
};

const container = {
  center: true,
  padding: "calc(var(--js-gutter-x) * 0.5)",
};

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors,
    fontSize,
    boxShadow,
    container,
    screens: {
      xs: { max: "576px" },
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1420px",
      xxxl: "1600px",
      laptop: { min: "1200px", max: "1550px" },
    },
    extend: {
      borderRadius,
      fontWeight,
      spacing,
    },
  },
  plugins: [],
};
