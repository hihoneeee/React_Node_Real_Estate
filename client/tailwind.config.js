/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-50": "#EDEFF6",
        "main-100": "#DBDFEC",
        "main-200": "#B7BFD9",
        "main-300": "#92A0C7",
        "main-400": "#6E80B4",
        "main-500": "#4A60A1",
        "main-600": "#3B4D81",
        "main-700": "#2C3A61",
        "main-800": "#1E2640",
        "main-900": "#0F1320",
        "overlay-10": "rgba(0,0,0,0.1)",
        "overlay-20": "rgba(0,0,0,0.2)",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-50": "rgba(0,0,0,0.5)",
        "overlay-70": "rgba(0,0,0,0.7)",
        "overlay-main-50": "rgba(0,0,063053,0.7)",
      },
      colors: {
        "main-50": "#EDEFF6",
        "main-100": "#DBDFEC",
        "main-200": "#B7BFD9",
        "main-300": "#92A0C7",
        "main-400": "#6E80B4",
        "main-500": "#4A60A1",
        "main-600": "#3B4D81",
        "main-700": "#2C3A61",
        "main-800": "#1E2640",
        "main-900": "#0F1320",
      },
      width: {
        main: "1319px",
      },
      fontSize: {
        xxs: ".5rem",
      },
      screens: {
        mobile: "640px", // Kích thước mobile
        tablet: "768px", // Kích thước tablet
        laptop: "1366px", // Kích thước laptop
        desktop: "1920px", // Kích thước màn hình 23.8 inch
      },
    },
    plugins: [
      require("@tailwindcss/forms")({
        strategy: "base", // only generate global styles
        strategy: "class", // only generate classes
      }),
    ],
  },
};
