'use client';
import React, { useEffect, useState } from 'react';
import ScriptViewer from './scriptViewer';
import { ICreateModeratorReq } from '../_types';

const ModeratorDetailPage = () => {
    const [script, setScript] = useState<string>('');

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

    return (
        <div>
            <h1>Moderator Detail Page</h1>
            <ScriptViewer script={script} />
        </div>
    );
};

export default ModeratorDetailPage;
