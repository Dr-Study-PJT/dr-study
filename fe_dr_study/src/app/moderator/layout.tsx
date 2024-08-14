'use client';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import LottieCommunity from '../group/_components/Lotties/Lottie_Community';
import LottieTrending from '../group/_components/Lotties/Lottie_Trending';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const styleTransitionColor = `transition duration-300 ease-in-out`;

export default function PLPLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        // <div className="relative flex flex-row justify-center pr-32 gap-4 h-max mb-14">
        <div className="flex flex-col justify-between gap-6 items-center w-full p-14 h-full px-40 bg-[#1A2036]">
            <header className="filter-title relative flex items-center justify-start w-full h-16">
                <div
                    className="absolute inset-0 opacity-75 z-0 rounded-lg border-2 border-dr-gray-100"
                    style={{
                        backgroundImage: 'url(/title-bg-moderator.jpeg)',
                        backgroundSize: '100% auto',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>

                <div className="TITLES justify-start items-end flex flex-row gap-4 relative text-center animate-fadeIn py-4 px-14">
                    <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                        AI 사회자 탐색
                    </div>
                    <p className="text-dr-body-4 text-dr-white mb-1">
                        스터디 공유자들이 만들어 놓은 AI 사회자를 저장하여
                        나만의 온라인 스터디에 활용할 수 있습니다.
                    </p>
                </div>
                {/* <LottieCommunity /> */}

                <div className="lottie-wrapper absolute right-[10%] top-[-75%] z-5 w-28 h-28">
                    <Image
                        src={'/images/teacher.png'}
                        alt="moderator"
                        layout="fill"
                    />
                </div>
            </header>
            {children}
        </div>
        // </div>
    );
}
