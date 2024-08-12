import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepProps } from './type';
import { LabelCheckboxGroup } from '@/components/organisms/LabelCheckboxGroup';
import { FaPlay } from 'react-icons/fa';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const S3_URL = 'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study';

    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {
        if (!data.modelType) handleChange('modelType', 'A');
        if (!data.voiceType) handleChange('voiceType', 'A');
        if (!data.characterType) handleChange('characterType', 'A');
    }, []);

    useEffect(() => {
        const videoSrc = `${S3_URL}/moderators/preset/videos/${data.modelType}_speak.mp4`;
        const audioSrc = `/audios/audio_${data.voiceType}${data.characterType}.mp3`;
        // const audioSrc = `${S3_URL}/moderators/preset/audios/${data.voiceType}${data.characterType}.mp3`;

        if (videoRef.current) videoRef.current.src = videoSrc;
        if (audioRef.current) audioRef.current.src = audioSrc;
    }, [data.modelType, data.voiceType, data.characterType]);

    const handlePlay = () => {
        if (audioRef.current && videoRef.current) {
            audioRef.current.currentTime = 0;
            videoRef.current.currentTime = 0;

            videoRef.current.play();
            audioRef.current.play();

            audioRef.current.onended = () => {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            };
        }
    };

    return (
        <>
            <div className="w-max flex flex-col justify-between self-center gap-4 mb-2">
                <div className="w-max h-max flex flex-row justify-between items-center gap-12 mt-6 self-center">
                    <section className="LEFT-CONTENT w-max h-full">
                        <div className="w-max h-full flex flex-col justify-between gap-6 items-center">
                            <div className="relative">
                                <div className="rounded-full relative overflow-hidden w-32 h-32 border-4 border-dr-indigo-100">
                                    <video
                                        ref={videoRef}
                                        muted
                                        className="w-full h-full object-cover"
                                        loop
                                    />
                                    <audio ref={audioRef} className="hidden" />
                                </div>
                                <button
                                    onClick={handlePlay}
                                    className={`absolute bottom-0 right-2 text-dr-white p-2 border-4 border-dr-coral-50 bg-dr-coral-300 hover:bg-dr-coral-100 transition-colors duration-300 rounded-full text-dr-body-5 text-center`}
                                >
                                    <FaPlay />
                                </button>
                            </div>
                            <InputWithLabelAndError
                                id=""
                                label="AI 사회자 이름"
                                inputSize="md"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    handleChange('name', e.target.value)
                                }
                                placeholder="AI 사회자의 이름을 지어주세요."
                            />
                        </div>
                    </section>
                    <div className="DIVIDER-VERTICAL h-[95%] border-[0.5px] border-dr-indigo-100"></div>
                    <section className="RIGHT-CONTENT w-max h-full">
                        <div className="w-max h-full flex flex-col justify-between gap-12 items-center">
                            <LabelCheckboxGroup
                                groupName="외형 타입"
                                options={[
                                    {
                                        id: 'type_model_a',
                                        label: '타입 A',
                                        value: 'A',
                                    },
                                    {
                                        id: 'type_model_b',
                                        label: '타입 B',
                                        value: 'B',
                                    },
                                    {
                                        id: 'type_model_c',
                                        label: '타입 C',
                                        value: 'C',
                                    },
                                ]}
                                value={data.modelType}
                                onChange={(value) =>
                                    handleChange('modelType', value)
                                }
                            />
                            <LabelCheckboxGroup
                                groupName="음성 타입"
                                options={[
                                    {
                                        id: 'type_voice_a',
                                        label: '타입 A',
                                        value: 'A',
                                    },
                                    {
                                        id: 'type_voice_b',
                                        label: '타입 B',
                                        value: 'B',
                                    },
                                    {
                                        id: 'type_voice_c',
                                        label: '타입 C',
                                        value: 'C',
                                    },
                                ]}
                                value={data.voiceType}
                                onChange={(value) =>
                                    handleChange('voiceType', value)
                                }
                            />
                            <LabelCheckboxGroup
                                groupName="어조 타입"
                                options={[
                                    {
                                        id: 'type_tone_a',
                                        label: '타입 A',
                                        value: 'A',
                                    },
                                    {
                                        id: 'type_tone_b',
                                        label: '타입 B',
                                        value: 'B',
                                    },
                                    {
                                        id: 'type_tone_c',
                                        label: '타입 C',
                                        value: 'C',
                                    },
                                ]}
                                value={data.characterType}
                                onChange={(value) =>
                                    handleChange('characterType', value)
                                }
                            />
                        </div>
                    </section>
                </div>
                <div className="w-auto flex justify-end ">
                    <Button size="md" onClick={onNext}>
                        다음으로
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Step1;
