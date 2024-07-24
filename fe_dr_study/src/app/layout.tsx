import RQProvider from './_components/RQProvider';
import { MSWComponent } from './_components/MSWComponent';

import './globals.css';
import Navigation from '@/components/organisms/Navigation/Navigation';

import localFont from 'next/font/local';
import SideBar from '@/components/organisms/SideBar/SideBar';

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
            weight: '500',
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
                    <div className="pt-[3.75rem]">
                        <Navigation />
                    </div>
                    <div className="pl-[3.75rem]">
                        <div className="relative bg-[#282B30] w-[4.575rem] h-[calc(100%)]">
                            <SideBar />
                        </div>
                        {children}
                    </div>
                </RQProvider>
            </body>
        </html>
    );
}
