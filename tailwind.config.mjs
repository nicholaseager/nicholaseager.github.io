import defaultTheme from "tailwindcss/defaultTheme";

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
              color: "rgb(51 65 85)", // content-strong
            },
            h2: {
              fontSize: ["24px", null, "30px", "35px"],
              fontWeight: "500",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              color: "rgb(51 65 85)", // content-strong
            },
            h3: {
              fontSize: ["20px", null, "25px", "30px"],
              fontWeight: "500",
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
              color: "rgb(51 65 85)", // content-strong
            },
            h4: {
              fontSize: ["17px", null, "22px", "22px"],
              fontWeight: "500",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(51 65 85)", // content-strong
            },
            h5: {
              fontSize: ["16px", null, "19px", "20px"],
              fontWeight: "500",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(51 65 85)", // content-strong
            },
            h6: {
              fontSize: ["15px", null, "17px", "18px"],
              fontWeight: "500",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(51 65 85)", // content-strong
            },
            p: {
              fontSize: ["15px", null, "17px", "19px"],
              fontWeight: "300",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "rgb(71 85 105)", // content
            },
            a: {
              fontSize: ["15px", null, "17px", "19px"],
              fontWeight: "600",
              letterSpacing: "0",
              lineHeight: "1.6",
              color: "#20605B", // primary
              textDecoration: "underline",
              "&:hover": {
                color: "#174541", // primary-hover
              },
            },
            blockquote: {
              fontSize: ["25px", null, "35px", "45px"],
              fontWeight: "300",
              letterSpacing: "-0.02em",
              lineHeight: "1.6",
              color: "rgb(71 85 105)", // content
            },
            "figcaption, caption": {
              fontSize: ["13px", null, "15px", "17px"],
              fontWeight: "300",
              letterSpacing: "0",
              lineHeight: "1.6",
              fontStyle: "italic",
              color: "rgb(71 85 105)", // content
            },
          },
        },
      },
      colors: {
        // Layout colors
        surface: {
          DEFAULT: "white",
          secondary: "rgb(241 245 249)", // slate-100
          tertiary: "rgb(226 232 240)", // slate-200
        },
        // Typography colors
        content: {
          DEFAULT: "rgb(71 85 105)", // slate-600
          strong: "rgb(51 65 85)", // slate-700
          light: "rgb(100 116 139)", // slate-500
          inverse: "white",
        },
        // Interactive elements
        primary: {
          DEFAULT: "#20605B",
          hover: "#174541",
          content: "white",
        },
        secondary: {
          DEFAULT: "rgb(226 232 240)", // slate-200
          hover: "rgb(203 213 225)", // slate-300
          content: "rgb(51 65 85)", // slate-700
        },
        // Component-specific colors
        component: {
          // For dropdowns, segmented controls, etc.
          DEFAULT: "rgb(226 232 240)", // slate-200
          hover: "rgb(241 245 249)", // slate-100
          active: "white",
          content: "rgb(51 65 85)", // slate-700
        },
        // Feedback colors
        success: {
          DEFAULT: "rgb(34 197 94)", // green-500
          light: "rgb(220 252 231)", // green-100
          content: "rgb(21 128 61)", // green-700
        },
        error: {
          DEFAULT: "rgb(239 68 68)", // red-500
          light: "rgb(254 226 226)", // red-100
          content: "rgb(185 28 28)", // red-700
        },
        // Backdrop colors
        backdrop: {
          // For behind modals, dimming content, etc.
          DEFAULT: "rgba(15, 23, 42, 0.5)", // slate-900 with 50% opacity
          dark: "rgba(15, 23, 42, 0.75)", // heavier dimming
          light: "rgba(15, 23, 42, 0.25)", // lighter dimming
        },
        // Border colors
        border: {
          DEFAULT: "rgb(226 232 240)", // slate-200
          heavy: "rgb(203 213 225)", // slate-300
        },
        social: {
          email: {
            DEFAULT: "rgb(71 85 105)",
            hover: "rgb(51 65 85)",
            content: "white",
          },
          facebook: {
            DEFAULT: "#1877F2",
            hover: "#166fe5",
            content: "white",
          },
          reddit: {
            DEFAULT: "#FF4500",
            hover: "#e63e00",
            content: "white",
          },
          twitter: {
            DEFAULT: "#1DA1F2",
            hover: "#1a91da",
            content: "white",
          },
          whatsapp: {
            DEFAULT: "#25D366",
            hover: "#22c55e",
            content: "white",
          },
          linkedin: {
            DEFAULT: "#0A66C2",
            hover: "#095196",
            content: "white",
          },
        },
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
