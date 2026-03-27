/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Night Forest Custom Colors
        night: {
          sky: "#0B1120",
          deep: "#070B14",
        },
        twilight: {
          DEFAULT: "#1E2A3B",
          light: "#2A3A4F",
        },
        moonlight: {
          DEFAULT: "#E8F1F2",
          dim: "#A0B4C0",
        },
        forest: {
          DEFAULT: "#2D5A3D",
          deep: "#1A3D28",
          dark: "#0F2418",
        },
        starlight: {
          DEFAULT: "#FFD700",
          dim: "#B8A030",
          glow: "#FFE55C",
        },
        earth: {
          DEFAULT: "#5C4033",
          dark: "#3D2B22",
        },
        midnight: {
          DEFAULT: "#1E3A5F",
          deep: "#152940",
        },
        glow: {
          cyan: "#7FFFFF",
          blue: "#5C9DFF",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 20px rgba(255, 215, 0, 0.3)",
        "glow-lg": "0 0 40px rgba(255, 215, 0, 0.4)",
        "glow-cyan": "0 0 20px rgba(127, 255, 255, 0.3)",
        "glass": "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "glass-hover": "0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "firefly-float": {
          "0%, 100%": { 
            transform: "translate(0, 0) scale(1)",
            opacity: "0.8"
          },
          "25%": { 
            transform: "translate(10px, -15px) scale(1.1)",
            opacity: "1"
          },
          "50%": { 
            transform: "translate(-5px, -25px) scale(0.9)",
            opacity: "0.6"
          },
          "75%": { 
            transform: "translate(-15px, -10px) scale(1)",
            opacity: "0.9"
          },
        },
        "gentle-pulse": {
          "0%, 100%": { 
            opacity: "0.4",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.8",
            transform: "scale(1.05)"
          },
        },
        "star-twinkle": {
          "0%, 100%": { 
            opacity: "0.3",
            transform: "scale(0.8)"
          },
          "50%": { 
            opacity: "1",
            transform: "scale(1.2)"
          },
        },
        "slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { 
            opacity: "0",
            transform: "scale(0.95)"
          },
          to: { 
            opacity: "1",
            transform: "scale(1)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "firefly": "firefly-float 8s ease-in-out infinite",
        "firefly-slow": "firefly-float 12s ease-in-out infinite",
        "firefly-fast": "firefly-float 6s ease-in-out infinite",
        "pulse-gentle": "gentle-pulse 4s ease-in-out infinite",
        "twinkle": "star-twinkle 3s ease-in-out infinite",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "night-sky": "linear-gradient(180deg, #0B1120 0%, #0F1724 50%, #1E2A3B 100%)",
        "forest-glow": "linear-gradient(135deg, rgba(45, 90, 61, 0.2) 0%, transparent 50%, rgba(255, 215, 0, 0.1) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
