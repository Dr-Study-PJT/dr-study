'use client';

import './globals.css';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from '@/store';
import 'react-toastify/dist/ReactToastify.css';

import RQProvider from './_components/RQProvider';
import { MSWComponent } from './_components/MSWComponent';
import SideBar from '@/components/organisms/SideBar';
import { usePathname } from 'next/navigation';
import ModalBox from '@/components/molecules/ModalBox/ModalBox';
import Navigation from '@/components/organisms/Navigation/Navigation';

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
    const pathname = usePathname();
    const isConference = /^\/conference\/\d+$/.test(pathname);

    return (
        <html lang="ko" className={`${pretendard.className}`}>
            <body className="h-screen overflow-hidden">
                <Provider store={store}>
                    <RQProvider>
                        <MSWComponent />
                        {isConference ? (
                            <>{children}</>
                        ) : (
                            <>
                                <div className="APP-HEADER pt-[3rem]">
                                    <Navigation />
                                </div>
                                <SideBar />
                                <div className="pl-[3rem] flex h-[calc(100vh-3rem)]">
                                    <div className="flex-1 overflow-auto bg-dr-dark-300">
                                        {children}
                                    </div>
                                </div>
                                <ModalBox />
                            </>
                        )}
                    </RQProvider>
                </Provider>
            </body>
        </html>
    );
}
