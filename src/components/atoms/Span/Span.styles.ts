import { tv } from 'tailwind-variants';

export const spanStyles = tv({
  base: '',
  variants: {
    variant: {
      b1: 'text-lg',
      b2: 'text-base',
      b3: 'text-sm',
      b4: 'text-sm font-light',
    },
    color: {
      primary: 'text-blue-500',
      secondary: 'text-purple-500',
      success: 'text-green-500',
      danger: 'text-red-500',
      black: 'text-black',
      white: 'text-white', // 흰 글씨 추가
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'b2',
    color: 'black',
  },
});
