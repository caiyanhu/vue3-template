/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url(/images/home_background.svg)",
        textArea: "url(./src/assets/textArea.svg)",
      },
    },
  },
  plugins: [],
};
