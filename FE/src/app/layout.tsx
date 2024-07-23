import RQProvider from './_components/RQProvider';
import { MSWComponent } from './_components/MSWComponent';

import './globals.css';
import Navigation from '@/components/organisms/Navigation/Navigation';

import localFont from 'next/font/local';
import { Box } from '../components/atoms/Box/Box';
import {
    CreateError,
    CreateLoading,
} from '@/components/organisms/LoadingAndResult/LoadingAndResult';
import { CreateSuccess } from '../components/organisms/LoadingAndResult/LoadingAndResult';
import { Span } from '../components/atoms/Span/Span';
import { Heading } from '@/components/atoms';

const pretendard = localFont({
    src: [
        {
            path: './assets/fonts/Pretendard-Black.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-ExtraBold.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-Medium.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-ExtraLight.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '/assets/fonts/Pretendard-Thin.otf',
            weight: '100',
            style: 'normal',
        },
    ],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={`${pretendard.className}`}>
            <body>
                <RQProvider>
                    <MSWComponent />
                    {children}
                    <Navigation>네브바</Navigation>
                    {/* 아래는 네브바 아래에... */}
                    {/* 사이드바 */}
                    <Box variant="sideBar">
                        아무거나임
                        {/* 아래는 3가지 페이지임! */}
                    </Box>

                    <Box variant="main">
                        <CreateError />
                        {/* <CreateSuccess/> */}
                        {/* <CreateLoading/> */}
                    </Box>
                    {/* 여기까지 종류별 3가지 페이지 */}
                    {/*            
                    <Box variant="home">
                        <Box variant="mainTop">
                            <Heading variant='h2' color='white'>
                                span에서 재사용 높일것 !필요!
                                더 <span className="text-blue-700">간편</span>하게, 더 우수하게
                            </Heading>
                            <Heading variant='h2' color='white'>
                                강도높은 <span className="text-blue-700">AI 온라인 스터디</span>
                            </Heading>
                        </Box>
                    </Box> */}

                    {/* <div>
                        본문래퍼
                        <div>사이드바</div>
                        {children}
                    </div> */}
                </RQProvider>
            </body>
        </html>
    );
}
