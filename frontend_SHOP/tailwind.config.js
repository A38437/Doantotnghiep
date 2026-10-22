/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif;"],
      },
      colors: {
        primary: "#70c1b3",
        secondary: "#14B8A6",
        textBold: "#000000",
        text1: "#333",
        text2: "#F3F4F6",
        text3: "#C2BDBA",
        error: "rgb(247,0,0)",
        success: "rgb(50,199,1)",
      },
      boxShadow: {
        // Thêm cấu hình box-shadow tùy chỉnh ở đây
        custom: "0 4px 6px rgba(0, 0, 0, 0.1)",
        custom2: "0px 2px 6px 3px rgba(0, 0, 0, 0.1)",
        custom3: "-1px 1px 6px 6px #70c1b3",
      },
      borderRadius: {
        custom: "105px 14px 14px 105px",
        custom2: "14px 105px 105px 14px",
      },
      screens: {
        sm: { max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px" },
      },
    },
  },
  plugins: [],
};
