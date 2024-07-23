import { tv } from 'tailwind-variants';

import { Button, Heading, Span } from '@/components/atoms';
import Icon from '@/components/atoms/Icon/Icon';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { StepsBox } from '@/components/molecules/StepsBox/StepsBox';
import { PlainTextForm } from '@/components/organisms/forms/PlainTextForm/PlainTextForm';
import CreateStudyGroupProgress from '@/components/organisms/forms/CreateStudyGroupProgress/CreateStudyGroupProgress';

const baseButton = tv({
    base: [
        'font-semibold',
        'dark:text-white',
        'py-1',
        'px-3',
        'rounded-full',
        'active:opacity-80',
        'bg-zinc-100',
        'hover:bg-zinc-200',
        'dark:bg-zinc-800',
        'dark:hover:bg-zinc-800',
    ],
});

const buyButton = tv({
    extend: baseButton,
    base: [
        'text-sm',
        'text-white',
        'rounded-lg',
        'shadow-lg',
        'uppercase',
        'tracking-wider',
        'bg-blue-500',
        'hover:bg-blue-600',
        'shadow-blue-500/50',
        'dark:bg-blue-500',
        'dark:hover:bg-blue-600',
    ],
});

const button = tv({
    base: 'font-medium bg-blue-500 text-white rounded-full active:opacity-80',
    variants: {
        color: {
            primary: 'bg-blue-500 text-white',
            secondary: 'bg-purple-500 text-white',
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'px-4 py-3 text-lg',
        },
    },
    compoundVariants: [
        {
            size: ['sm', 'md'],
            class: 'px-3 py-1',
        },
    ],
    defaultVariants: {
        size: 'md',
        color: 'primary',
    },
});

// 타입작성 !필요!
const Examples = ({ children }: any) => {
    return (
        <div className="w-full">
            <Icon icon="house" bg="gray" size="xl" active />
            <Icon icon="people" bg="gray" size="xl" />
            <Icon icon="person" bg="gray" size="xl" />
            <Icon icon="globe" bg="gray" size="xl" />
            <Icon icon="arrowLeft" bg="gray" size="xl" />
            {/* <button className={baseButton()}>Button</button>
      <button className={buyButton()}>Buy button</button>
      <button className={button({ color: 'secondary' })}>variant button</button> */}
            <ul className="flex gap-1">
                <li>
                    <Button size="sm">sm 다음으로</Button>
                </li>
                <li>
                    <Button size="md">md 다음으로</Button>
                </li>
                <li>
                    <Button size="lg">lg 다음으로</Button>
                </li>
                <li>
                    <Button size="xl">xl 다음으로</Button>
                </li>
            </ul>
            <div>
                <Heading variant="h2">h2 스터디그룹 생성</Heading>
                <Heading variant="h3" color="primary">
                    h3 스터디그룹 생성
                </Heading>
                <Heading variant="h4" color="danger">
                    h4 스터디그룹 생성
                </Heading>
            </div>
            <ul>
                <li>
                    <Span variant="s1">
                        s1 스터디 그룹 기본정보를 작성해주세요.
                    </Span>
                </li>
                <li>
                    <Span variant="b1">
                        b1 스터디 그룹 기본정보를 작성해주세요.
                    </Span>
                </li>
                <li>
                    <Span variant="b2">
                        b2 스터디 그룹 기본정보를 작성해주세요.
                    </Span>
                </li>
                <li>
                    <Span variant="b3" color="primary">
                        b3 스터디 그룹 기본정보를 작성해주세요.
                    </Span>
                </li>
                <li>
                    <Span variant="b4" color="danger">
                        b4 스터디 그룹 기본정보를 작성해주세요.
                    </Span>
                </li>
            </ul>
            <PlainTextForm />

            <div className="p-4 flex gap-4">
                <ImageUpload shape="circle" />
                <ImageUpload shape="rounded-square" />
                <ImageUpload shape="circle" />
            </div>

            <StepsBox title="제목" subTitle="부제목" steps={3} currentStep={1}>
                본문
            </StepsBox>

            <CreateStudyGroupProgress />
            <div className="bg-cs">dsad</div>
            <div className="bg-coral-200">dsad</div>
            <div className="bg-coral-300">dsad</div>
            <div className="bg-gray-100">dsad</div>
            <div className="bg-gray-200">dsad</div>
            <div className="bg-gray-300">dsad</div>
            <div className="bg-gray-400">dsad</div>
            <div className="bg-gray-500">dsad</div>
            <div className="text-lg">바디1</div>
            <div className="text-dr-body-1">바디1</div>
            <div className="text-dr-body-2">바디2</div>
            <div className="text-dr-body-3">바디3</div>
            <div className="text-dr-body-4">바디4</div>
            <div className="text-dr-header-2">헤더2</div>
            <div className="text-dr-header-3">바디3</div>
            <div className="text-dr-header-4">바디4</div>
            <div className="gap-dr-g25 bg-red-700">dsads</div>
            <div className="gap-dr-g1   bg-red-700">dsads</div>
            <div className="gap-dr-g1  bg-dr-red">dsads</div>
            <div className="gap-dr-g1  text-dr-red">dsads</div>
            <div className="gap-dr-g1  text-dr-red shadow-dr-rb-2">dsads</div>
            <div className="gap-dr-g1  text-dr-red shadow-dr">dsads</div>
            <div className="gap-dr-g1  text-dr-red shadow-dr-rb-2">dsads</div>
            <div className="gap-dr-g1  text-dr-red shadow-dr-b-2">dsads</div>
        </div>
    );
};

export default Examples;
