import { ErrorLottie } from '@/app/_components/Lottie/Error/ErrorLottie';
import { Button } from '@/components/atoms';
import Link from 'next/link';

const NotExistConference = () => {
    return (
        <div className="flex text-center flex-col content-center justify-center items-center text-dr-white min-h-[100%]">
            <div className="">
                <h2 className="text-dr-header-2">
                    이미 종료되었거나 존재하지 않는 컨퍼런스 입니다.
                </h2>
                <ErrorLottie />
                <Link href="/">
                    <Button rounded color="gray" fullWidth>
                        홈으로
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotExistConference;
