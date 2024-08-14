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
import { useEffect, useState } from 'react';

import { IoClose, IoRemove, IoSquareOutline } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';

const pretendard = localFont({
    src: [
        {
            path: './assets/fonts/Pretendard-Black.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-ExtraBold.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-ExtraLight.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: './assets/fonts/Pretendard-Thin.otf',
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
    const [scrollPosition, setScrollPosition] = useState('top');
    const [isElectron, setIsElectron] = useState(false);

    useEffect(() => {
        setIsElectron(typeof window !== 'undefined' && !!window.electron);

        const bodyBox = document.querySelector('.BODY-CONTENTS');
        const handleScroll = (event: any) => {
            const scrollTop = event.target.scrollTop;
            if (scrollTop > 50) {
                setScrollPosition('scrolled');
            } else {
                setScrollPosition('top');
            }
        };

        bodyBox?.addEventListener('scroll', handleScroll);
        return () => {
            bodyBox?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <html lang="ko" className={`${pretendard.className}`}>
            <body className="h-screen overflow-hidden flex flex-col">
                <Provider store={store}>
                    <RQProvider>
                        <MSWComponent />
                        {isConference ? (
                            <>{children}</>
                        ) : (
                            <>
                                {/* 커스텀 윈도우 헤더 */}
                                <div
                                    className="WINDOW-HEADER flex flex-row items-center justify-between bg-dr-dark-500 text-white fixed top-0 left-0 right-0 z-50 -webkit-app-region: no-drag;"
                                    onDoubleClick={() => {
                                        window.electron?.doubleClickTitleBar();
                                    }}
                                >
                                    <div className="text-dr-gray-100 cursor-default text-[14px] font-bold px-4 -webkit-app-region: drag;">
                                        Dr. Study
                                    </div>
                                    <div
                                        className="flex-grow h-full"
                                        style={
                                            {
                                                WebkitAppRegion: 'drag',
                                            } as React.CSSProperties
                                        }
                                    ></div>

                                    {isElectron && (
                                        <div className="flex -webkit-app-region: no-drag; h-full">
                                            <button
                                                className="text-[14px] hover:bg-dr-dark-100 w-5 flex flex-row items-center justify-center"
                                                onClick={() => {
                                                    window.electron.minimize();
                                                }}
                                            >
                                                <IoRemove />
                                            </button>
                                            <button
                                                className="text-[10px] hover:bg-dr-dark-100 w-5 flex flex-row items-center justify-center"
                                                onClick={() => {
                                                    window.electron.maximize();
                                                }}
                                            >
                                                <IoSquareOutline />
                                            </button>
                                            <button
                                                className="text-[14px] hover:bg-dr-red w-5 flex flex-row items-center justify-center"
                                                onClick={() => {
                                                    window.electron.close();
                                                }}
                                            >
                                                <IoClose />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* 앱 네비게이션 */}
                                <div className="APP-HEADER relative z-90">
                                    <Navigation
                                        scrollPosition={scrollPosition}
                                    />
                                </div>
                                <SideBar />
                                {/* 사이드바 및 메인 컨텐츠 */}
                                <div className="BODY-BOX flex h-full">
                                    <div className="BODY-CONTENTS flex-1 overflow-auto bg-dr-indigo-400">
                                        {children}
                                    </div>
                                </div>
                                <ModalBox />
                                <ToastContainer position="bottom-right" />
                            </>
                        )}
                    </RQProvider>
                </Provider>
            </body>
        </html>
    );
}
