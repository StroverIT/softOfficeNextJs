const customColors = {
  "bg-color": "#f3f3f3",
  primary: { DEFAULT: "#0D6EFD", 500: "hsl(215, 80%, 33%)" },
  "primary-150": "hsl(215, 80%, 20%)",

  "primary-50": "hsl(190, 90%, 40%)",

  "primary-100": "hsl(190, 90%, 50%)",
  "primary-200": "hsl(190, 100%, 80%)",
  "primary-300": "hsl(190, 100%, 90%)",

  "primary-trans": "hsl(215, 80%, 60%, 100%)",
  "primary-0": "hsl(215, 80%, 60%, 15%)",
  secondary: "hsl(358, 83%, 56%)",

  dark: {
    DEFAULT: "hsl(0, 0%, 8%)",
    100: "hsl(0, 15%, 24%)",

    400: "#686868",

    transparent: "hsl(0, 0%, 8%, 0.5)",
  },
  white: "hsl(0, 0%, 100%)",
  "white-lighter-trans": "hsl(0, 0%, 100%, 30%)",
  blue: "hsl(203, 76%, 48%)",
  orange: "hsl(33, 89%, 52%)",
  green: "hsl(92, 50%, 54%)",
  gray: {
    DEFAULT: "hsl(0, 0%, 85%)",
    100: "#fafafa",
    200: "#a1a1aa",
    250: "#5a5a5a",
    300: "#f6f6f6",
    400: "#eee",
    500: "grey",

    bord: "#dfdfdf",
    darker: "hsl(0, 0%, 50%)",
  },
  grayBg: "#f0f0f0",
  transparent: "transparent",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: { min: "350px" },
      sm: { min: "640px" },
      // => @media (min-width: 640px) { ... }

      md: { min: "768px" },
      lg: { min: "1024px" },
      "max-lg": { max: "1024px" },

      xl: { min: "1280px" },

      "2xl": { min: "1536px" },
    },
    colors: customColors,
    backgroundColor: (theme) => ({
      ...theme("colors"),

      color: customColors["bg-color"],
      primary: customColors.primary,
      "primary-lighter": customColors["primary-lighter"],
      "primary-trans": customColors["primary-trans"],
      secondary: customColors.secondary,
      dark: customColors.dark,
      white: customColors.white,
      blue: customColors.blue,
      orange: customColors.orange,
      green: customColors.green,
      gray: customColors.gray,
      "gray-darker": customColors["gray-darker"],
      transparent: customColors.transparent,
    }),
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "min(100% - 2rem, 1300px);",
        },
      });
    },
  ],
};
