import React, { ReactNode, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { Block, validChildBlocks } from './blockTypes';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';

const DroppableBlock: React.FC<{
    block: Block;
    onDrop: (block: Block, targetBlock: Block) => void;
    onDelete: (block: Block) => void;
    onStringInput: (block: Block, value: string) => void;
    onParticipantInput: (block: Block, value: string) => void;
    onDurationInput: (block: Block, value: string) => void;
    onLoopInput: (block: Block, value: string) => void;
    children?: ReactNode;
}> = ({
    block,
    onDrop,
    onDelete,
    onStringInput,
    onParticipantInput,
    onDurationInput,
    onLoopInput,
    children,
}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item: Block, monitor: DropTargetMonitor) => {
            if (!monitor.didDrop()) {
                if (item.type === 'block_convenience_full_study_speak') {
                    const loopBlock: Block = {
                        id: uuidv4(),
                        type: 'block_flow_loop',
                        content: '반복 블록',
                        loopCount: '현재 총 참여인원 수',
                        children: [
                            {
                                id: uuidv4(),
                                type: 'block_command_letParticipant_speak',
                                content: '발화 시작',
                                participant: '반복회차 i',
                                duration: '30',
                            },
                            {
                                id: uuidv4(),
                                type: 'block_command_queryToGPT',
                                content: 'GPT 블록',
                                children: [
                                    {
                                        id: uuidv4(),
                                        type: 'block_string_input',
                                        content:
                                            item.presetValue ||
                                            '사전 설정된 값',
                                    },
                                    {
                                        id: uuidv4(),
                                        type: 'block_getParticipantRecord_recent',
                                        content: '직전 발화자의 발화 내용',
                                    },
                                    {
                                        id: uuidv4(),
                                        type: 'block_string_input',
                                        content: '그 다음을 진행해줘',
                                    },
                                ],
                            },
                        ],
                    };
                    onDrop(loopBlock, block);
                } else if (
                    block.type === 'block_flow_loop' &&
                    item.type === 'block_int_variable_num_of_participants'
                ) {
                    onLoopInput(block, '현재 총 참여인원 수');
                } else if (
                    block.type === 'block_command_letParticipant_speak' &&
                    item.type === 'block_iteration_index'
                ) {
                    onParticipantInput(block, '반복회차 i');
                } else if (validChildBlocks[block.type].includes(item.type)) {
                    onDrop({ ...item, id: uuidv4() }, block);
                } else {
                    alert(
                        `유효하지 않은 블록입니다. ${block.type} 블록에는 ${validChildBlocks[
                            block.type
                        ].join(', ')} 블록만 추가할 수 있습니다.`,
                    );
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: Block) =>
            validChildBlocks[block.type].includes(item.type) ||
            (item.type === 'block_convenience_full_study_speak' &&
                block.type.startsWith('block_flow_phase')) ||
            (block.type === 'block_flow_loop' &&
                item.type === 'block_int_variable_num_of_participants') ||
            (block.type === 'block_command_letParticipant_speak' &&
                item.type === 'block_iteration_index'),
    });

    const dropRef = useRef<HTMLDivElement>(null);
    drop(dropRef);

    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete(block);
        }
    };

    const handleParticipantChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        onParticipantInput(block, e.target.value);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDurationInput(block, e.target.value);
    };

    const handleLoopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onLoopInput(block, e.target.value);
    };

    const handleStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onStringInput(block, e.target.value);
    };

    const blockColors = {
        block_flow_phase_1: 'bg-red-500 hover:bg-red-600',
        block_flow_phase_2: 'bg-red-400 hover:bg-red-500',
        block_flow_phase_3: 'bg-red-300 hover:bg-red-400',
        block_flow_phase_4: 'bg-red-200 hover:bg-red-300',
        block_flow_loop: 'bg-red-800 hover:bg-red-900',
        block_command_queryToGPT: 'bg-violet-500 hover:bg-violet-600',
        block_command_letParticipant_speak: 'bg-blue-500 hover:bg-blue-600',
        block_string_input: 'bg-violet-300 hover:bg-violet-400',
        block_getParticipantRecord_recent: 'bg-black hover:bg-gray-900',
        block_int_variable_num_of_participants:
            'bg-green-500 hover:bg-green-600',
        block_iteration_index: 'bg-orange-500 hover:bg-orange-600',
        block_convenience_full_study_speak: 'bg-coral-500 hover:bg-coral-600',
    };

    return (
        <div
            ref={dropRef}
            className={`UNIT-BLOCK animate-popIn relative text-dr-body-4 ${
                isOver ? 'bg-dr-dark-200' : ''
            } border-opacity-0 border-dr-coral-300 ${
                canDrop ? 'border-2 border-opacity-100' : ''
            } rounded-md w-full my-2 min-h-20 h-auto transition-all duration-300 ${
                canDrop ? 'pb-12' : 'pb-2'
            } ${blockColors[block.type]}`}
        >
            <div className="flex flex-row h-auto gap-2 justify-between">
                {block.type !== 'block_string_input' && (
                    <div className="HEAD bg-dr-indigo-200 rounded-tl-md rounded-br-md font-semibold text-dr-white h-full min-w-[80px] p-1">
                        {block.content === '문자열 입력' ? '' : block.content}
                    </div>
                )}

                <button
                    className={`w-6 h-6 m-1 p-1 rounded-full hover:text-gray-500 transition-colors duration-200 justify-end ${
                        block.type === 'block_string_input'
                            ? 'w-full flex flex-row justify-end'
                            : 'w-6'
                    }`}
                    onClick={handleDelete}
                >
                    <FaTrash />
                </button>
            </div>
            <div className="CHILDREN h-auto w-full p-2">
                {block.type === 'block_string_input' && (
                    <textarea
                        placeholder="문자열을 입력해주세요."
                        defaultValue={block.content}
                        onBlur={handleStringChange}
                        className="bg-transparent border-none outline-none text-dr-black bg-violet-50 w-full resize-none h-16 p-2 text-dr-body-4 rounded-md"
                        rows={4}
                    />
                )}
                {block.type === 'block_command_letParticipant_speak' && (
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            placeholder="참가자 입력"
                            value={
                                block.participant === '반복회차 i'
                                    ? '반복회차 i'
                                    : block.participant || ''
                            }
                            onChange={handleParticipantChange}
                            className="bg-transparent border-none outline-none text-dr-coral-300 font-semibold bg-white rounded-md w-1/4 text-dr-body-4 text-center"
                        />
                        <span>번째 참가자</span>
                        <input
                            type="number"
                            placeholder="초 입력"
                            value={block.duration || ''}
                            onChange={handleDurationChange}
                            className="bg-transparent text-dr-coral-300 font-semibold border-none outline-none bg-white rounded-md w-1/6 text-center"
                        />
                        <span>초 동안</span>
                    </div>
                )}
                {block.type === 'block_flow_loop' && (
                    <div className="flex flex-row gap-2 w-full">
                        <input
                            type="text"
                            placeholder="반복 회차"
                            value={
                                block.loopCount === '현재 총 참여인원 수'
                                    ? '현재 총 참여인원 수'
                                    : block.loopCount || ''
                            }
                            onChange={handleLoopChange}
                            className="bg-transparent border-none outline-none text-dr-coral-300 font-semibold bg-white w-1/3 rounded-md text-center"
                        />
                        <div>번 반복</div>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default DroppableBlock;
