/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './templates/**/*.{js,ts,jsx,tsx,mdx}', // tailwind css 적용을 위한 디렉토리를 세팅한다.

        // `src` directory를 사용한다면
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['var(--font-pretendard)'],
            },
            colors: {
                'dr-coral-50': '#B1D0FF',
                'dr-coral-100': '#4B9CFF',
                'dr-coral-200': '#2E8CFF',
                'dr-coral-300': '#0E78F9',
                'dr-coral-400': '#006DFF',
                'dr-coral-500': '#0060FF',
                'dr-gray-100': '#D2D2D2',
                'dr-gray-200': '#ACACAC',
                'dr-gray-300': '#838383',
                'dr-gray-400': '#595959',
                'dr-gray-500': '#424242',
                'dr-indigo-0': '#2a2f42 ',
                'dr-indigo-50': '#242838',
                'dr-indigo-100': '#212534',
                'dr-indigo-200': '#1C1F2E',
                'dr-indigo-300': '#181b27',
                'dr-indigo-400': '#11131b',
                'dr-indigo-500': '#0e0f16',
                'dr-dark-100': '#36393E',
                'dr-dark-200': '#282B30',
                'dr-dark-300': '#232323',
                'dr-white': '#FFFFFF',
                'dr-black': '#000000',
                'dr-red': '#C62828',
            },
            fontSize: {
                'dr-body-1': '1.125rem',
                'dr-body-2': '1rem',
                'dr-body-3': '0.875rem',
                'dr-body-4': '0.700rem',
                'dr-body-5': '0.500rem',
                'dr-header-2': '1.3125rem',
                'dr-header-3': '1.5rem',
                'dr-header-4': '2.25rem',
            },
            gap: {
                'dr-5': '0.3125rem',
                'dr-10': '0.625rem',
                'dr-15': '0.9375rem',
                'dr-20': '1.25rem',
                'dr-25': '1.5625rem',
                'dr-30': '1.875rem',
            },
            boxShadow: {
                'dr-rb-2':
                    '0 4px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15)', // 기본 버튼 그림자
                'dr-b-2': '0 4px 10px rgba(0, 0, 0, 0.15)', // 기본 버튼 그림자
            },
            keyframes: {
                popIn: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '100%': { opacity: '1' },
                    '0%': { opacity: '0' },
                },
            },
            animation: {
                popIn: 'popIn 0.1s ease-out',
                fadeIn: 'fadeIn 0.15s ease-out',
                fadeIn: 'fadeOut 0.15s ease-out',
            },
        },
    },
    plugins: [],
};
