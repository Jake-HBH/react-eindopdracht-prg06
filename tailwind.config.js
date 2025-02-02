/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            black: '#0a0a0a',
            primary: '#FF6F61',
            secondary: '#FFD700',
            accent: '#9C27B0',
            background: '#F8F8F8',
            text: '#333333',
            gray: {
                lighter: '#E0E0E0',
                light: '#A5A5A5',
                dark: '#333333',
                muted: '#757575',
            },
        },
        extend: {
            boxShadow: {
                card: '0 10px 30px rgba(0, 0, 0, 0.1)',
                button: '0 5px 15px rgba(0, 0, 0, 0.2)',
            },
            animation: {
                'button-pulse': 'pulse 1.5s infinite',
            },
            keyframes: {
                pulse: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
