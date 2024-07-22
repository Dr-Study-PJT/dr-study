import Link from 'next/link';

import { ErrorLottie } from './_components/Lottie/Error/ErrorLottie';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="w-full">
        <ErrorLottie />
      </div>
      <h1>아무것도 없네요!</h1>

      <button
        className="
      bg-secondary
      w-28
      px-3
      py-2.5
      m-auto
      mt-[60px]
      rounded-md
      !text-black
      "
      >
        <Link href="/">홈으로</Link>
      </button>
    </div>
  );
}
