import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'flex items-center justify-center rounded-md focus:outline-none transition duration-200',
  variants: {
    color: {
      primary: 'text-blue-500',
      secondary: 'text-purple-500',
      success: 'text-green-500',
      danger: 'text-red-500',
      white: 'text-white', // 흰 글씨 추가
    },
    bg: {
      gray: 'bg-gray-800',
      black: 'bg-black',
      white: 'bg-white',
      primary: 'bg-blue-500',
      none: '',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-md',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    },
    shape: {
      square: 'square',
      rounded: 'rounded',
      circle: 'rounded-full',
    },

    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      class: 'hover:bg-blue-400', // hover 시 연한 파랑색 배경
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'white',
    bg: 'primary',
    shape: 'square',
    shadow: 'none',
    active: false,
  },
});
