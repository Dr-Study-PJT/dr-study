import { Block } from '../new/_components/Step3/blockTypes';

export const parseScriptToBlocks = (script: string): Block[] => {
    const blocks: Block[] = [];
    let currentParentBlock: Block | null = null;

    const lines = script
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    lines.forEach((line) => {
        if (line.startsWith('phase')) {
            const phaseNum = line.match(/phase\((\d+)\)/)?.[1];
            const phaseBlock: Block = {
                id: `${phaseNum}-phase`,
                type: `block_flow_phase_${phaseNum}` as any,
                content: `${phaseNum}단계`,
                children: [],
            };
            blocks.push(phaseBlock);
            currentParentBlock = phaseBlock; // 단계 블록이 최상위로 설정
        } else if (line.startsWith('loop')) {
            const loopCount = line.match(/loop\((.+)\)/)?.[1] || '';
            const loopBlock: Block = {
                id: `loop-${loopCount}`,
                type: 'block_flow_loop',
                content: '반복 블록',
                loopCount,
                children: [],
            };
            currentParentBlock?.children?.push(loopBlock);
            currentParentBlock = loopBlock; // 루프 블록을 현재 부모로 설정
        } else if (line.startsWith('let_participant_speak')) {
            const [participant, duration] =
                line.match(/\(([^,]+),\s*([^,]+)\)/)?.slice(1) || [];
            const letParticipantBlock: Block = {
                id: `letParticipant-${participant}`,
                type: 'block_command_letParticipant_speak',
                content: '발화 시작',
                participant,
                duration,
            };
            currentParentBlock?.children?.push(letParticipantBlock);
        } else if (line.startsWith('let_avatar_speak')) {
            const gptBlock: Block = {
                id: 'gpt',
                type: 'block_command_queryToGPT',
                content: 'GPT 블록',
                children: [],
            };
            currentParentBlock?.children?.push(gptBlock);
            currentParentBlock = gptBlock; // GPT 블록을 현재 부모로 설정
        } else if (line.startsWith('get_recent_participant_speak')) {
            const recentBlock: Block = {
                id: 'recent',
                type: 'block_getParticipantRecord_recent',
                content: '직전 발화자의 발화 내용',
            };
            currentParentBlock?.children?.push(recentBlock);
        } else if (line.startsWith('get_int_variable')) {
            const intVarBlock: Block = {
                id: 'intVar',
                type: 'block_int_variable_num_of_participants',
                content: '현재 총 참여인원 수',
            };
            currentParentBlock?.children?.push(intVarBlock);
        } else if (line.startsWith('get_num_of_iteration')) {
            const iterationBlock: Block = {
                id: 'iteration',
                type: 'block_iteration_index',
                content: '반복회차 i',
            };
            currentParentBlock?.children?.push(iterationBlock);
        } else if (line.startsWith('string_concat')) {
            const stringBlock: Block = {
                id: 'string',
                type: 'block_string_input',
                content: line.match(/'([^']+)'/)?.[1] || '',
            };
            currentParentBlock?.children?.push(stringBlock);
        } else if (line.startsWith('}')) {
            // 현재 블록이 끝났을 때 부모 블록으로 이동
            if (currentParentBlock && blocks.includes(currentParentBlock)) {
                currentParentBlock = null;
            } else if (
                currentParentBlock &&
                currentParentBlock?.children?.length
            ) {
                const parent = blocks.find((block) =>
                    block.children?.includes(currentParentBlock as any),
                );
                currentParentBlock = parent || null;
            }
        }
    });

    return blocks;
};
