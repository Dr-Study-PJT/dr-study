import { Heading, Span } from '@/components/atoms';
import Button from '@/components/atoms/Button/Button';
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
    <div>
      <Icon icon="house" bg="black" size="xl" active shadow="lg" />
      <Icon icon="people" bg="black" size="xl" shadow="lg" />
      <Icon icon="person" bg="black" size="xl" shadow="lg" />
      <Icon icon="globe" bg="black" size="xl" shadow="lg" />
      <Icon icon="arrowLeft" bg="black" size="xl" shadow="lg" />
      {/* <button className={baseButton()}>Button</button>
      <button className={buyButton()}>Buy button</button>
      <button className={button({ color: 'secondary' })}>variant button</button> */}
      <ul className="flex gap-1">
        <li>
          <Button size="sm">sm 다음으로</Button>
        </li>
        <li>
          <Button size="md">md 다음으로</Button>
        </li>
        <li>
          <Button size="lg">lg 다음으로</Button>
        </li>
        <li>
          <Button size="xl">xl 다음으로</Button>
        </li>
      </ul>

      <div>
        <Heading variant="h2">h2 스터디그룹 생성</Heading>
        <Heading variant="h3" color="primary">
          h3 스터디그룹 생성
        </Heading>
        <Heading variant="h4" color="danger">
          h4 스터디그룹 생성
        </Heading>
      </div>
      <ul>
        <li>
          <Span variant="s1">s1 스터디 그룹 기본정보를 작성해주세요.</Span>
        </li>
        <li>
          <Span variant="b1">b1 스터디 그룹 기본정보를 작성해주세요.</Span>
        </li>
        <li>
          <Span variant="b2">b2 스터디 그룹 기본정보를 작성해주세요.</Span>
        </li>
        <li>
          <Span variant="b3" color="primary">
            b3 스터디 그룹 기본정보를 작성해주세요.
          </Span>
        </li>
        <li>
          <Span variant="b4" color="danger">
            b4 스터디 그룹 기본정보를 작성해주세요.
          </Span>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
