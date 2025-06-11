import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ▼ CLAUDE COLOR PALETTE ▼
        
        // Light Mode Colors
        "bg-primary": "#ffffff",
        "bg-secondary": "#fafaf9", 
        "bg-tertiary": "#f5f4f2",
        "text-primary": "#1a1a1a",
        "text-secondary": "#4a4a4a",
        "text-tertiary": "#6a6a6a",
        "accent-primary": "#da7756",
        "accent-hover": "#c76646",
        "accent-light": "#f5e6e0",
        "border-color": "#e5e5e5",
        
        // Dark Mode Colors (for reference)
        "dark-bg-primary": "#1a1a1a",
        "dark-bg-secondary": "#252525",
        "dark-bg-tertiary": "#2f2f2f", 
        "dark-text-primary": "#f5f5f5",
        "dark-text-secondary": "#c0c0c0",
        "dark-text-tertiary": "#9a9a9a",
        "dark-accent-primary": "#e88968",
        "dark-accent-hover": "#da7756",
        "dark-accent-light": "#3a2925",
        "dark-border": "#3a3a3a",
        
        // Semantic Colors
        success: "#008844",
        warning: "#ff9900", 
        error: "#cc0000",
        info: "#da7756",

        // ▼ DESIGN TOKENS ▼
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--accent)",
        foreground: "var(--text)",
        
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--surface)",
        },
        secondary: {
          DEFAULT: "var(--accent-2)",
          foreground: "var(--text)",
        },
        destructive: {
          DEFAULT: "var(--error)",
          foreground: "var(--surface)",
        },
        muted: {
          DEFAULT: "var(--border)",
          foreground: "var(--text)",
        },
        popover: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text)",
        },
        
        // Core design tokens - Claude Theme Variables
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text-primary)",
        accent: "var(--color-accent)",
        accentDark: "var(--color-accent-dark)",
        accentLight: "var(--color-accent-light)",
        cta: "var(--color-cta)",
        
        // Background system
        background: {
          DEFAULT: "var(--bg)",
          secondary: "var(--surface)",
        },
        
        // Legacy compatibility colors (keeping minimal set for existing components)
        claude: {
          terracotta: "#da7756",
          black: "#1a1a1a",
          "light-peach": "#f5e6e0",
          "deep-brown": "#1a1a1a",
          "soft-neutral": "#fafaf9",
        },
        portfolio: {
          'primary': '#da7756',
          'primary-light': '#e88968',
          'primary-dark': '#c76646',
          'cream': '#f5e6e0',
          'navy': '#1a1a1a',
        },
        sonnet: {
          orange: "#da7756",
          "light-orange": "#f5e6e0",
          white: "#ffffff",
          "light-gray": "#fafaf9",
          "dark-gray": "#1a1a1a",
        },
      },
      fontFamily: {
        // ▼ CLAUDE TYPOGRAPHY ▼
        'primary': ['Inter', 'Nunito Sans', 'system-ui', 'sans-serif'],
        'heading': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Crimson Text', 'system-ui', 'serif'],
        
        // Standard font families
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'Nunito Sans', 'system-ui', 'sans-serif'],
        'serif': ['Crimson Text', 'system-ui', 'serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        // ▼ TYPOGRAPHY SCALE ▼
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      spacing: {
        // ▼ SPACING SYSTEM ▼
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        // ▼ BORDER RADIUS SYSTEM ▼ 
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        // ▼ CLAUDE SHADOW SYSTEM ▼
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'soft': '0 4px 6px rgba(0, 0, 0, 0.08)', 
        'medium': '0 10px 15px rgba(0, 0, 0, 0.08)',
        'large': '0 20px 25px rgba(0, 0, 0, 0.08)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        // ▼ ANIMATION SYSTEM ▼
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out", 
        "slide-in": "slideIn 0.3s ease-out",
        "slide-out": "slideOut 0.3s ease-in",
        "bounce-soft": "bounceSoft 2s infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        // ▼ KEYFRAME ANIMATIONS ▼
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-10px)", opacity: "0" },
        },
        bounceSoft: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
        pulseSoft: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.7" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      transitionTimingFunction: {
        // ▼ EASING FUNCTIONS ▼
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
