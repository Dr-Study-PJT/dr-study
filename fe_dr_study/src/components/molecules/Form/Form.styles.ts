import { tv } from 'tailwind-variants';

export const formWrapperStyles = tv({
  base: '',
  variants: {
    variant: {
      steps: 'py-[42px] flex flex-col items-center w-full gap-[40px]',
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});
