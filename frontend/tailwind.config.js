/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'dark-space': "url(https://e0.pxfuel.com/wallpapers/135/165/desktop-wallpaper-stars-space-dark-purple-space.jpg)",
       // 'dark-space':"url(https://e0.pxfuel.com/wallpapers/509/605/desktop-wallpaper-space-best-space-and-on-chat-blue-purple-space.jpg)",
       'gradient-light':'linear-gradient(45deg, rgba(210, 0, 26, 0.4), rgba(103, 88, 215,0.4), rgba(244, 142, 33, 0.4))',
       'gradient-dark':'linear-gradient(25deg, rgba(183, 12, 83,1), rgba(33, 33, 119,1), rgba(3, 3, 39, 1))',
      },

      backgroundColor:{
        background:
        "linear-gradient(45deg, rgba(210, 0, 26, 0.4), rgba(103, 88, 215,0.4), rgba(244, 142, 33, 0.4))",
      },
      colors: {
        white: "#fff",
        orange: "#fbbc05",
        darkgoldenrod: "#c78a00",
        midnightblue: "#212177",
     
        lightgray: "#cfd5d6",

        dimgray: "#5d5d5d",
        goldenrod: "#fdc75b",
        skyblue: "rgba(87, 204, 224, 0.47)",
        salmon: "#ff7c7c",
        mediumslateblue: "#5d5fef",
        lightseagreen: "#37b6c1",
        plum: "#c29fe9",
        whitesmoke: "#eee",
    },
    rotate: {
      '30': '30deg',
    },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};