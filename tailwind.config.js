/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/index.html"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("flowbite/plugin"),
    require("tailwindcss"),
    require("autoprefixer")
  ],
}

