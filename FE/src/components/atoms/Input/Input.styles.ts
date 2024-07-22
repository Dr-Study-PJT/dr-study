// import { background } from "styled-system";

// 스타일 토큰 작성

// StyledInput.tsx
// import styled from "styled-components";
import React from 'react';
import { tv } from 'tailwind-variants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
}

// const StyledInput = styled.input<InputProps>`
//   border: 2px solid ${(props) => props.borderColor || '#ccc'};
//   border-radius: ${(props) => props.borderRadius || '4px'};
//   padding: ${(props) => props.padding || '8px'};
//   font-size: 16px;
//   width: 100%;
//   box-sizing: border-box;

//   &:focus {
//     border-color: ${(props) => props.borderColor || '#007BFF'};
//     outline: none;
//   }
// `;

// export default StyledInput;


export const AtomInputStyles = tv({
    base: 'flex items-center justify-center rounded-md focus:outline-none transition duration-200 border',
    variants: {
        variant: {
            createFail:
                'w-[416px] h-[134px] rounded-[8px] border border-[#E74A3B] p-[12px_16px_12px_16px] gap-[8px]',
        },
        color: {
            primary: 'bg-gray-100 border-gray-300 text-black',
            secondary: 'bg-white border-gray-500 text-black',
            success: 'bg-green-100 border-green-300 text-black',
            danger: 'bg-red-100 border-red-300 text-black',
            warning: 'bg-yellow-100 border-yellow-300 text-black',
        },
        textSize: {
            sm: 'px-2 py-1 text-sm',
            md: 'px-4 py-2 text-md',
            lg: 'px-6 py-3 text-lg',
            xl: 'px-8 py-4 text-xl',
        },
        border: {
            none: 'border-none',
            thin: 'border',
            thick: 'border-2',
        },
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            full: 'rounded-full',
        },
        shadow: {
            none: '',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
            xl: 'shadow-xl',
        },
        disabled: {
            true: 'opacity-50 cursor-not-allowed',
            false: '',
        },
    },
    compoundVariants: [
        {
            // 커스텀 컴파운드 스타일 추가 가능
        },
    ],
    defaultVariants: {
        // size: 'md',
        // color: 'primary',
        // border: 'thin',
        // rounded: 'md',
        // shadow: 'none',
        // disabled: false,
    },
});
