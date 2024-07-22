import React from 'react';
import Link from 'next/link';
import { LogoProps } from './Logo.types';
import { logoStyles } from './Logo.styles';
import Image from 'next/image';

export const Logo = ({}: LogoProps) => {
  return (
    <Link href="/" className={logoStyles({})}>
      <Image width={82} height={82} src="/peeper.png" alt="Company Logo" />
    </Link>
  );
};
