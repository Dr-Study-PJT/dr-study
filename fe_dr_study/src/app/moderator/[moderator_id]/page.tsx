'use client';
import React, { useEffect, useState } from 'react';
import ScriptViewer from './scriptViewer';
import { ICreateModeratorReq } from '../_types';
import { Moderator } from '@/interfaces/moderator';
import { GET } from '@/app/api/routeModule';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ModeratorDetail } from '@/components/template/moderator/ModeratorTemplate';
import Link from 'next/link';

const ModeratorDetailPage = () => {
    const pathname = useParams();

    const moderatorId = pathname.moderator_id;

    const [script, setScript] = useState<string>('');
    const [moderator, setModerator] = useState<Moderator | null>(null);

    useEffect(() => {
        // 임의의 스크립트 예시
        const testScript = `
phase(1) {
  let_participant_speak(get_num_of_iteration(), 30);
  loop(3) {
    let_participant_speak(get_num_of_iteration(), 10);
    let_avatar_speak(gpt_query(string_concat(
      '안녕하세요, ',
      get_recent_participant_speak(1),
      ' 입니다. 오늘은 날씨가 좋네요.'
    )));
    let_participant_speak(get_num_of_iteration(), 20);
  }
}
phase(2) {
  let_avatar_speak(gpt_query(string_concat(
    '지금부터 2단계를 시작하겠습니다.',
    '모두 집중해주세요.'
  )));
  loop(get_int_variable('num_of_participant')) {
    let_participant_speak(get_num_of_iteration(), 40);
  }
}
phase(3) {
  let_avatar_speak(gpt_query(string_concat(
    '3단계입니다. 이제 더 어려운 문제를 풀어보겠습니다.'
  )));
  loop(5) {
    let_participant_speak(get_num_of_iteration(), 15);
  }
}
phase(4) {
  let_avatar_speak(gpt_query(string_concat(
    '4단계입니다. 마지막 단계를 잘 마무리해주세요.'
  )));
  let_participant_speak(get_num_of_iteration(), 60);
}
`;
        setScript(testScript);
        fetchModerator();
    }, []);

    const data: ICreateModeratorReq = {
        name: 'Sample Moderator',
        description: 'Description here',
        characterType: 'type',
        modelType: 'model',
        voiceType: 'voice',
        script: script,
        prePrompt: 'Pre prompt here',
    };

    const fetchModerator = async () => {
        console.log(moderatorId);
        const response = await GET(`v1/moderators/${moderatorId}`, {
            params: '',
            isAuth: true,
            revalidateTime: 10,
        });
        console.log('사회자 조회 성공:', response);

        setModerator(response.data);
    };

    return (
        <div>
            <h1>Moderator Detail Page</h1>
            <ModeratorCard moderator={moderator} />
            <ScriptViewer script={script} />
        </div>
    );
};

const ModeratorCard: React.FC<{ moderator: Moderator | null }> = ({
    moderator,
}) => {
    console.log(moderator);
    if (!moderator) {
        return <Loading />;
    }

    return (
        <div className=" w-full bg-dr-indigo-400 p-4 rounded-xl shadow-md flex flex-col gap-4 px-[10rem]">
            <div className="flex flex-col items-center gap-4 text-dr-white  text-center bg-dr-indigo-300 py-[2rem] rounded-lg">
                <div>
                    <p>AI 제작자 정보</p>
                </div>
                <Link href={`/member/${moderator?.creator?.id}`}>
                    <div className="relative w-[8rem] h-[8rem] rounded-full overflow-hidden">
                        <Image
                            src={moderator?.creator?.imageUrl}
                            alt={moderator?.creator?.nickname}
                            fill
                        />
                    </div>
                </Link>
                <div className="flex flex-col">
                    <h2 className="text-dr-header-3 font-bold text-dr-white">
                        {moderator?.creator?.nickname}
                    </h2>
                    <p className="text-dr-body-3 text-dr-gray-200">
                        {moderator?.creator?.email}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-dr-white  text-center bg-dr-indigo-300 py-[2rem] rounded-lg">
                <p>AI 사회자 정보</p>
                <ModeratorDetail moderator={moderator} />
            </div>
        </div>
    );
};

export default ModeratorDetailPage;
