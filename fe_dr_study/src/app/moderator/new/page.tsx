import { Button, Label } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';

const pageStyles = `PAGE-CREATE-MODERATOR flex justify-center items-center w-full h-full bg-gray-800`;
const containerStyles = `CONTAINER-FORM min-w-[60%] w-max flex bg-gray-900 text-dr-white rounded-lg shadow-xl overflow-hidden border-[1px] border-dr-gray-300 p-4`;

const CreateModeratorPage = () => {
    return (
        <div className={pageStyles}>
            <div className={containerStyles}>
                <div className="min-h-[70vh] w-full flex flex-col justify-start items-center gap-4">
                    <section className="TITLE-SECTION w-1/2 h-1/4 flex flex-col justify-center">
                        <div className="TITLE-AND-PAHSE items-center flex flex-col justify-center w-full h-max">
                            <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                                사회자 AI 생성
                            </div>
                            <div className="SUBTITLE-TEXT text-dr-body-4 font-semibold text-dr-coral-100 w-full text-center">
                                블록 쌓기로 더욱 자세한 스터디 진행방식을
                                만들어보세요.
                            </div>
                            <div className="BAR-PHASE mt-8 w-4/6 h-max pb-6">
                                <div className="relative w-full h-max">
                                    <div className="absolute top-[0.375rem] left-0 w-full border-[1px] border-dr-indigo-100 z-0"></div>
                                    <div className="absolute top-0 left-0 w-full flex flex-row justify-around z-10">
                                        {[1, 2, 3, 4].map((c, i) => {
                                            return (
                                                <div
                                                    key={{ i }}
                                                    className={`w-3 h-3 bg-dr-coral-300 rounded-full shadow-md border-[1px] ${i === 0 ? ' border-dr-white' : ' border-dr-coral-300'}`}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="CONTENTS-SECTION-STEP1-AVATAR w-3/5 h-max min-h-[50%] flex flex-col gap-2">
                        <div className="w-full h-max  flex flex-row justify-around gap-6 items-center">
                            <section className="LEFT-CONTENT w-full h-full">
                                <div className="w-full h-full flex flex-col justify-between gap-6 items-center">
                                    <div className="rounded-full relative overflow-hidden w-40 h-40">
                                        <Image
                                            alt="avater"
                                            src="/images/login_thumbnail.png"
                                            fill
                                            objectFit="cover"
                                        />
                                    </div>
                                    <InputWithLabelAndError
                                        label="AI 사회자 이름"
                                        inputSize="md"
                                    />
                                </div>
                            </section>
                            <div className="DIVIDER-VERTICAL h-[95%] border-[0.5px] border-dr-indigo-100"></div>
                            <section className="RIGHT-CONTENT w-full h-full ">
                                <div className="w-full h-full flex flex-col justify-around gap-6 items-center">
                                    <div className="GROUP-CHECKBOXES-WITH-LABEL align-left w-full">
                                        <Label
                                            key={'사회자 이름'}
                                            className="font-semibold"
                                        >
                                            외형 타입
                                        </Label>
                                        <div className="flex flex-row justify-between w-full h-4 px-1 mt-1">
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 A
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 B
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 C
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="GROUP-CHECKBOXES-WITH-LABEL align-left w-full">
                                        <Label
                                            key={'사회자 이름'}
                                            className="font-semibold"
                                        >
                                            음성 타입
                                        </Label>
                                        <div className="flex flex-row justify-between w-full h-4 px-1 mt-1">
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 A
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 B
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 C
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="GROUP-CHECKBOXES-WITH-LABEL align-left w-full">
                                        <Label
                                            key={'사회자 이름'}
                                            className="font-semibold"
                                        >
                                            어조 타입
                                        </Label>
                                        <div className="flex flex-row justify-between w-full h-4 px-1 mt-1">
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 A
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 B
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <input type="checkbox" />
                                                <span className="text-dr-white text-dr-body-5">
                                                    타입 C
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="w-full h-max items-end flex flex-col">
                            <Button size="md">버튼</Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreateModeratorPage;

// ==================================
