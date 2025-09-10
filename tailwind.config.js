// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-blue': {
                    light: '#3B82F6',
                    DEFAULT: '#2563EB',
                    dark: '#1D4ED8',
                },
                'dark-bg': '#0B0F19',
                'light-text': '#F8FAFC',
                'muted-text': '#94A3B8',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                'gradient-pan': {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' },
                },
            },
            animation: {
                'gradient-pan': 'gradient-pan 15s ease infinite',
            },
        },
    },
    plugins: [],
}