import { tv } from 'tailwind-variants';

export const iconStyles = tv({
  base: 'flex items-center justify-center text-white rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300',
  variants: {
    color: {
      primary: 'text-blue-500',
      secondary: 'text-purple-500',
      success: 'text-green-500',
      danger: 'text-red-500',
    },
    bg: {
      gray: 'bg-[#393C49]',
      black: 'bg-black',
      white: 'bg-white',
      primary: 'primary',
      none: '', // 배경색 없음
    },
    size: {
      navIcon: '72',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
    },
    fontSize: {
      navIcon: 'text-[72px]',
    },
    shape: {
      square: '',
      rounded: 'rounded',
      circle: 'rounded-full',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      active: true,
      class: 'bg-blue-500 text-white',
    },
    {
      active: false,
      color: 'primary',
      class: 'hover:bg-blue-400', // hover 시 연한 파랑색 배경
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    bg: 'none',
    shape: 'square',
    shadow: 'none',
    active: false,
  },
});
