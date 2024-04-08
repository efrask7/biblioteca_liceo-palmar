/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/index.html"
  ],
  theme: {
    extend: {
      colors: {
        head: '#5a80f5',
        headgreen: '#87ee9d',
        bordercol: '#222dd3',
        'azure-radiance': {
          '50': '#eff3ff',
          '100': '#dce3fd',
          '200': '#c1cffc',
          '300': '#96b1fa',
          '400': '#5a80f5',
          '500': '#405ff1',
          '600': '#2b3fe5',
          '700': '#222dd3',
          '800': '#2226ab',
          '900': '#212687',
          '950': '#191a52',
      }
      }
    }
  },
  darkMode: "class",
  plugins: [
    require("flowbite/plugin"),
    require("tailwindcss"),
    require("autoprefixer")
  ],
}

