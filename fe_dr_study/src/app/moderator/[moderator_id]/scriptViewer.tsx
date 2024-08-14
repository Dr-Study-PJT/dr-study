'use client';
import React, { useEffect, useState } from 'react';
import { Block } from '../new/_components/Step3/blockTypes';
import { parseScriptToBlocks } from './scriptParser';

interface ViewerProps {
    script: string;
}

const BlockViewer: React.FC<{ block: Block; level: number }> = ({
    block,
    level,
}) => {
    const blockColors: { [key in Block['type']]: string } = {
        block_flow_phase_1: 'bg-red-500 hover:bg-red-600',
        block_flow_phase_2: 'bg-red-500 hover:bg-red-600',
        block_flow_phase_3: 'bg-red-500 hover:bg-red-600',
        block_flow_phase_4: 'bg-red-500 hover:bg-red-600',
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

    const blockColorClass = blockColors[block.type] || '';

    return (
        <div
            className={`UNIT-BLOCK animate-popIn relative text-dr-body-4 ${blockColorClass} border-opacity-0 border-dr-coral-300 rounded-md w-full my-2 min-h-20 h-auto transition-all duration-300`}
            style={{ marginLeft: `${level * 20}px` }}
        >
            <div className="flex flex-row h-auto gap-2 justify-between">
                <div className="HEAD font-semibold text-white h-full min-w-[80px] p-1">
                    {block.content}
                </div>
            </div>
            <div className="CHILDREN h-auto w-full p-2">
                {block.participant && (
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            value={block.participant}
                            disabled
                            className="bg-transparent border-none outline-none text-dr-coral-300 font-semibold bg-white rounded-md w-1/4 text-dr-body-4 text-center"
                        />
                        <span className="text-white">번째 참가자</span>
                    </div>
                )}
                {block.duration && (
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            value={block.duration}
                            disabled
                            className="bg-transparent border-none outline-none text-dr-coral-300 font-semibold bg-white rounded-md w-1/6 text-center"
                        />
                        <span className="text-white">초 동안</span>
                    </div>
                )}
                {block.loopCount && (
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            value={block.loopCount}
                            disabled
                            className="bg-transparent border-none outline-none text-dr-coral-300 font-semibold bg-white rounded-md w-1/3 text-center"
                        />
                        <span className="text-white">번 반복</span>
                    </div>
                )}
                {block.type === 'block_string_input' && (
                    <textarea
                        value={block.content}
                        disabled
                        className="bg-transparent border-none outline-none text-dr-black bg-violet-50 w-full resize-none h-16 p-2 text-dr-body-4 rounded-md"
                        rows={4}
                    />
                )}
                {block.children &&
                    block.children.map((childBlock) => (
                        <BlockViewer
                            key={childBlock.id}
                            block={childBlock}
                            level={level + 1}
                        />
                    ))}
            </div>
        </div>
    );
};

const ScriptViewer: React.FC<ViewerProps> = ({ script }) => {
    const [blocks, setBlocks] = useState<Block[]>([]);

    useEffect(() => {
        const parsedBlocks = parseScriptToBlocks(script);
        setBlocks(parsedBlocks);
    }, [script]);

    return (
        <div className="DROPPABLE_AREA min-h-[10rem] rounded-lg bg-dr-coral-300 w-full h-auto flex flex-col px-4 py-4 border-opacity-0 border-dr-coral-300 border-2 transition-all duration-300">
            <div className="text-dr-white font-bold text-dr-body-4 ">
                블록을 추가하세요.
            </div>
            <div>
                {blocks.map((block) => (
                    <BlockViewer key={block.id} block={block} level={0} />
                ))}
            </div>
        </div>
    );
};

export default ScriptViewer;
