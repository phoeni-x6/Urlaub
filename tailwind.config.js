/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F766E",
        "primary-dark": "#0A4F4A",
        accent: "#F59E0B",
        "accent-dark": "#D97706",
        background: "#F8FAFC",
        textmain: "#1F2937",
        textsecondary: "#6B7280",
        borderlight: "#E5E7EB",
      },
    },
  },
  plugins: [],
};