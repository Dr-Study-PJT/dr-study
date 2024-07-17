import Icon from '@/components/atoms/Icon/Icon';
import React from 'react';
import { tv } from 'tailwind-variants';

const baseButton = tv({
  base: [
    'font-semibold',
    'dark:text-white',
    'py-1',
    'px-3',
    'rounded-full',
    'active:opacity-80',
    'bg-zinc-100',
    'hover:bg-zinc-200',
    'dark:bg-zinc-800',
    'dark:hover:bg-zinc-800',
  ],
});

const buyButton = tv({
  extend: baseButton,
  base: [
    'text-sm',
    'text-white',
    'rounded-lg',
    'shadow-lg',
    'uppercase',
    'tracking-wider',
    'bg-blue-500',
    'hover:bg-blue-600',
    'shadow-blue-500/50',
    'dark:bg-blue-500',
    'dark:hover:bg-blue-600',
  ],
});

const button = tv({
  base: 'font-medium bg-blue-500 text-white rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

// 타입작성 !필요!
const Navigation = ({ children }: any) => {
  return (
    <div className="flex gap-3">
      <Icon />
      <button className={baseButton()}>Button</button>
      <button className={buyButton()}>Buy button</button>
      <button className={button({ color: 'secondary' })}>variant button</button>
    </div>
  );
};

export default Navigation;
