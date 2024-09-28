/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url(/images/home_background.svg)",
        homeBottom: "url(/images/home_background_bottom.svg)",
        textArea: "url(./src/assets/textArea.svg)",
        voiceWave: "url(./src/assets/voiceWave.webp)",
        voiceWaveInit: "url(./src/assets/voiceWaveInit.png)",
        answer: "url(/images/answer_background.svg)",
      },
    },
  },
  plugins: [],
};
