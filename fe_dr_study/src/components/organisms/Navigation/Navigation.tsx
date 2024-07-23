import React from 'react';

import { Box } from '@/components/atoms/Box/Box';
import Icon from '@/components/atoms/Icon/Icon';
import { Logo } from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { Button } from '@/components/atoms';

const Navigation = ({ children }: any) => {
    return (
        <Box variant="navigation">
            <Logo />
            <div className="w-full flex justify-between items-center ">
                <ul className="flex gap-[1.85rem] pl-20">
                    <li>
                        <Link href="/">
                            <Icon
                                icon="house"
                                bg="gray"
                                text="white"
                                size="lg"
                                cursor="pointer"
                                hover="blue"
                                active
                            />
                        </Link>
                    </li>
                    <li>
                        <Icon
                            icon="people"
                            bg="gray"
                            size="lg"
                            cursor="pointer"
                            hover="blue"
                        />
                    </li>
                    <li>
                        <Icon
                            icon="person"
                            bg="gray"
                            size="lg"
                            cursor="pointer"
                            hover="blue"
                        />
                    </li>
                    <li>
                        <Icon
                            icon="globe"
                            bg="gray"
                            size="lg"
                            cursor="pointer"
                            hover="blue"
                        />
                    </li>
                </ul>
                <Link href={'auth/login'} className="mr-[10rem]">
                    <Button bg="gray">로그인</Button>
                </Link>
            </div>
        </Box>
    );
};

export default Navigation;
