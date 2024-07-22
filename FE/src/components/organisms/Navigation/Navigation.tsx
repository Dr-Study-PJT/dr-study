import { Box } from '@/components/atoms/Box/Box';
import Icon from '@/components/atoms/Icon/Icon';
import { Logo } from '@/components/atoms/Logo/Logo';
import React from 'react';

const Navigation = ({ children }: any) => {
  return (
    <Box variant="navigation">
      <Logo />
      <div>
        <ul className="flex">
          <li>
            <Icon icon="house" bg="gray" fontSize="navIcon" />
          </li>
          <li>
            <Icon icon="people" bg="gray" />
          </li>
          <li>
            <Icon icon="person" bg="gray" />
          </li>
          <li>
            <Icon icon="globe" bg="gray" />
          </li>
        </ul>
        {/* <NavLeft></NavLeft> */}
        {/* <NavRight></NavRight> */}
      </div>
    </Box>
  );
};

export default Navigation;
