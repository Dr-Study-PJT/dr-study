import { tv } from 'tailwind-variants';

export const headingStyles = tv({
  base: '',
  variants: {
    variant: {
      h2: 'font-bold text-4xl',
      h3: 'font-bold text-2xl',
      h4: 'font-bold text-xl',
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
    variant: 'h2',
    color: 'black',
  },
});
