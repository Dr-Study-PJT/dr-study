import React from 'react';

import { Box } from '@/components/atoms/Box/Box';
import Icon from '@/components/atoms/Icon/Icon';
import { Logo } from '@/components/atoms/Logo/Logo';

const Navigation = ({ children }: any) => {
    return (
        <Box variant="navigation">
            <Logo />
            <div>
                <ul className="flex">
                    <li>
                        <Icon icon="house" bg="gray" size="sm" active={true} />
                    </li>
                    <li>
                        <Icon icon="people" bg="gray" size="md" />
                    </li>
                    <li>
                        <Icon icon="person" bg="gray" size="lg" />
                    </li>
                    <li>
                        <Icon icon="globe" bg="gray" size="xl" />
                    </li>
                </ul>
                {/* <NavLeft></NavLeft> */}
                {/* <NavRight></NavRight> */}
            </div>
        </Box>
    );
};

export default Navigation;
