import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mainTheme: {
                    primary: '#FFFFFF',
                    secondary: '#FFFCFC',
                    accent: '#AA2B2B',
                    neutral: '#E7F9FD',
                    'base-100': '#1D6786',
                },
            },
            'dark',
            'cupcake',
        ],
    },
};
export default config;
