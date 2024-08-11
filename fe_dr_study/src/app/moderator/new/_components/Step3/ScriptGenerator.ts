import { Block } from './blockTypes';

export const generateScript = (blocks: Block[]): string => {
    const generateBlockScript = (
        block: Block,
        indentLevel: number = 0,
    ): string => {
        let script = '';
        const indent = '  '.repeat(indentLevel);
        switch (block.type) {
            case 'block_flow_phase_1':
            case 'block_flow_phase_2':
            case 'block_flow_phase_3':
            case 'block_flow_phase_4':
                script += `${indent}phase(${block.type.split('_').pop()}) {`;
                break;
            case 'block_flow_loop':
                const loopCount =
                    block.loopCount === '현재 총 참여인원 수'
                        ? `get_int_variable('num_of_participant')`
                        : `${block.loopCount}`;
                script += `${indent}loop(${loopCount}) {`;
                break;
            case 'block_command_letParticipant_speak':
                const participant = block.participant
                    ? block.participant === '반복회차 i'
                        ? `get_num_of_iteration()`
                        : `${block.participant}`
                    : '';
                const duration = block.duration ? `${block.duration}` : '';
                script += `${indent}let_participant_speak(${participant}, ${duration});`;
                break;
            case 'block_command_queryToGPT':
                script += `${indent}let_avatar_speak(gpt_query(string_concat(`;
                if (block.children && block.children.length > 0) {
                    script += block.children
                        .map((child) => generateBlockScript(child, 0))
                        .join(', ');
                }
                script += `)));`;
                break;
            case 'block_string_input':
                script += `'${block.content}'`;
                break;
            case 'block_getParticipantRecord_recent':
                script += `get_recent_participant_speak(1)`;
                break;
            case 'block_int_variable_num_of_participants':
                script += `get_int_variable('num_of_participant')`;
                break;
            case 'block_iteration_index':
                script += `get_num_of_iteration()`;
                break;
            default:
                break;
        }
        if (block.type !== 'block_command_queryToGPT' && block.children) {
            block.children.forEach((child) => {
                script += generateBlockScript(child, indentLevel + 1);
            });
        }
        if (
            block.type === 'block_flow_loop' ||
            block.type === 'block_flow_phase_1' ||
            block.type === 'block_flow_phase_2' ||
            block.type === 'block_flow_phase_3' ||
            block.type === 'block_flow_phase_4'
        ) {
            script += `${indent}}`;
        }
        return script;
    };

    return blocks.map((block) => generateBlockScript(block)).join('');
};
