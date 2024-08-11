import Link from 'next/link';

import { ErrorLottie } from './_components/Lottie/Error/ErrorLottie';

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center align-middle text-center text-dr-white">
            <div className="w-full">
                <ErrorLottie />
            </div>
            <h1 className="text-dr-header-3 font-bold">아무것도 없네요!</h1>

            <Link
                className="mt-[3rem] text-dr-body-2 text-dr-white bg-dr-dark-100 py-3 px-6 rounded-2xl w-[12rem] self-center font-semibold hover:bg-dr-dark-200 transition-colors duration-300"
                href="/"
            >
                홈으로
            </Link>
        </div>
    );
}
