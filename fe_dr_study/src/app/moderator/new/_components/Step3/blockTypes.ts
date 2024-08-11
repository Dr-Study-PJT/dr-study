import { v4 as uuidv4 } from 'uuid';

export type BlockType =
    | 'block_flow_phase_1'
    | 'block_flow_phase_2'
    | 'block_flow_phase_3'
    | 'block_flow_phase_4'
    | 'block_flow_loop'
    | 'block_command_queryToGPT'
    | 'block_command_letParticipant_speak'
    | 'block_string_input'
    | 'block_getParticipantRecord_recent'
    | 'block_int_variable_num_of_participants'
    | 'block_iteration_index';

export interface Block {
    id: string;
    type: BlockType;
    content: string;
    children?: Block[];
    participant?: string;
    duration?: string;
    loopCount?: string;
}

export const blocks: Block[] = [
    {
        id: uuidv4(),
        type: 'block_flow_phase_1',
        content: '1단계',
    },
    {
        id: uuidv4(),
        type: 'block_flow_phase_2',
        content: '2단계',
    },
    {
        id: uuidv4(),
        type: 'block_flow_phase_3',
        content: '3단계',
    },
    {
        id: uuidv4(),
        type: 'block_flow_phase_4',
        content: '4단계',
    },
    {
        id: uuidv4(),
        type: 'block_flow_loop',
        content: '반복 블록',
    },
    {
        id: uuidv4(),
        type: 'block_command_queryToGPT',
        content: 'GPT 블록',
    },
    {
        id: uuidv4(),
        type: 'block_command_letParticipant_speak',
        content: '발화 시작',
    },
    {
        id: uuidv4(),
        type: 'block_string_input',
        content: '문자열 입력',
    },
    {
        id: uuidv4(),
        type: 'block_getParticipantRecord_recent',
        content: '직전 발화자의 발화 내용',
    },
    {
        id: uuidv4(),
        type: 'block_int_variable_num_of_participants',
        content: '현재 총 참여인원 수',
    },
    {
        id: uuidv4(),
        type: 'block_iteration_index',
        content: '반복회차 i',
    },
];

export const validChildBlocks: Record<BlockType, BlockType[]> = {
    block_flow_phase_1: [
        'block_flow_loop',
        'block_command_queryToGPT',
        'block_command_letParticipant_speak',
    ],
    block_flow_phase_2: [
        'block_flow_loop',
        'block_command_queryToGPT',
        'block_command_letParticipant_speak',
    ],
    block_flow_phase_3: [
        'block_flow_loop',
        'block_command_queryToGPT',
        'block_command_letParticipant_speak',
    ],
    block_flow_phase_4: [
        'block_flow_loop',
        'block_command_queryToGPT',
        'block_command_letParticipant_speak',
    ],
    block_flow_loop: [
        'block_command_queryToGPT',
        'block_command_letParticipant_speak',
    ],
    block_command_queryToGPT: [
        'block_string_input',
        'block_getParticipantRecord_recent',
    ],
    block_command_letParticipant_speak: [],
    block_string_input: [],
    block_getParticipantRecord_recent: [],
    block_int_variable_num_of_participants: [],
    block_iteration_index: [],
};
