import colorPalette from './colorPalette';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type Weight =
    | 'light'
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold';

export type ThemeBaseType = {
    palette: Object;
    spacing: Record<Size, string>;
    borderRadius: Record<Size, string>;
    typography: {
        fontSize: Record<Size, string>;
        fontWeight: Record<Weight, number>;
    };
};

const ThemeBase: ThemeBaseType = {
    palette: colorPalette,
    // teamStyle: {
    //     color: {
    //         blue: {
    //           '100': '#007AFF',
    //           '300': '#0E78F9',
    //             '200': '#2196F3',
    //             '300': '#419CFF',
    //         },
    //         gray: {
    //           '0':'#000000',
    //           '0':'#212534',
    //           '100':'#262627',
    //           '100':'#282B30',
    //           '100':'#393C49',
    //           '100':'#909090',
    //           '100':'#000000',
    //           '100':'#000000',
    //         }
    //     },
    // },
    spacing: {
        sm: '0.75rem',
        md: '0.875rem',
        lg: '1rem',
        xl: '1.25rem',
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.625rem',
    },
    typography: {
        fontSize: {
            h2: 'text-4xl font-bold',
            h3: 'text-2xl font-bold',
            h4: 'text-xl font-bold',
            s1: 'text-lg font-semibold',
            b1: 'text-lg',
            b2: 'text-base',
            b3: 'text-sm',
            b4: 'text-sm font-light',
        },
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700,
            extraBold: 800,
        },
    },
};

export default ThemeBase;
