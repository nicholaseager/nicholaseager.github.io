/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: ["25px", null, "35px", "45px"],
              fontWeight: "500",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              color: "rgb(51 65 85)", // text-slate-700
            },
            h2: {
              fontSize: ["22px", null, "30px", "35px"],
              fontWeight: "500",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              color: "rgb(51 65 85)",
            },
            h3: {
              fontSize: ["22px", null, "25px", "30px"],
              fontWeight: "500",
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
              color: "rgb(51 65 85)",
            },
            h4: {
              fontSize: ["17px", null, "22px", "22px"],
              fontWeight: "500",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(51 65 85)",
            },
            h5: {
              fontSize: ["17px", null, "20px", "20px"],
              fontWeight: "500",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(51 65 85)",
            },
            h6: {
              fontSize: ["17px", null, "20px", "20px"],
              fontWeight: "500",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(51 65 85)",
            },
            p: {
              fontSize: ["15px", null, "17px", "19px"],
              fontWeight: "300",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(71 85 105)", // text-slate-600
            },
            a: {
              fontSize: ["15px", null, "17px", "19px"],
              fontWeight: "600",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(71 85 105)", // text-slate-600
              textDecoration: "underline",
            },
            blockquote: {
              fontSize: ["25px", null, "35px", "45px"],
              fontWeight: "300",
              letterSpacing: "-0.02em",
              lineHeight: "1.6",
              color: "rgb(71 85 105)",
            },
            "figcaption, caption": {
              fontSize: ["13px", null, "15px", "17px"],
              fontWeight: "300",
              letterSpacing: "0",
              lineHeight: "1.6",
              fontStyle: "italic",
              color: "rgb(71 85 105)",
            },
          },
        },
      },
      colors: {
        background: {
          DEFAULT: "#ffffff",
          alt: "#f4f5f6",
        },
        border: "#dddddd",
        text: {
          dark: "#2a2f36",
          medium: "#6c7a89",
          light: "#abb7b7",
        },
        accent: {
          DEFAULT: "#4ecdc4",
        },
        overlay: {
          bg: "#4ecdc4",
          text: "#ffffff",
          accent: "#2a2f36",
        },
        error: "#d64541",
        social: {
          facebook: {
            DEFAULT: "#1877F2",
            hover: "#166fe5",
          },
          reddit: {
            DEFAULT: "#FF4500",
            hover: "#e63e00",
          },
          twitter: {
            DEFAULT: "#1DA1F2",
            hover: "#1a91da",
          },
          whatsapp: {
            DEFAULT: "#25D366",
            hover: "#22c55e",
          },
          linkedin: {
            DEFAULT: "#0A66C2",
            hover: "#095196",
          },
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        title: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
