/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        title: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
