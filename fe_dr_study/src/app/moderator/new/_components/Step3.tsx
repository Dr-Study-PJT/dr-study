'use client';
import { StepProps } from './type';
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@/components/atoms';

const Step3: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const [droppedBlocks, setDroppedBlocks] = useState<Block[]>([]);
    const [fbScript, setFbScript] = useState<string>('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleDrop = (block: Block, targetBlock?: Block) => {
        const newBlock = { ...block, id: uuidv4() };

        if (targetBlock) {
            const addChildToBlock = (parent: Block, child: Block): Block => {
                if (parent.id === targetBlock.id) {
                    return {
                        ...parent,
                        children: parent.children
                            ? [...parent.children, child]
                            : [child],
                    };
                }
                if (parent.children) {
                    return {
                        ...parent,
                        children: parent.children.map((c) =>
                            addChildToBlock(c, child),
                        ),
                    };
                }
                return parent;
            };
            setDroppedBlocks((prevBlocks) =>
                prevBlocks.map((b) => addChildToBlock(b, newBlock)),
            );
        } else {
            if (newBlock.type === 'block_flow_loop') {
                newBlock.children = [
                    {
                        id: uuidv4(),
                        type: 'block_iteration_index',
                        content: '반복회차 i',
                    },
                ];
            }
            setDroppedBlocks((prevBlocks) => [...prevBlocks, newBlock]);
        }
    };

    const deleteBlock = (block: Block) => {
        const removeBlockById = (blocks: Block[], id: string): Block[] => {
            return blocks
                .filter((block) => block.id !== id)
                .map((block) => ({
                    ...block,
                    children: block.children
                        ? removeBlockById(block.children, id)
                        : [],
                }));
        };

        setDroppedBlocks((prevBlocks) => removeBlockById(prevBlocks, block.id));
    };

    const handleStringInput = (block: Block, value: string) => {
        const updateBlockContent = (
            blocks: Block[],
            id: string,
            content: string,
        ): Block[] => {
            return blocks.map((block) => {
                if (block.id === id) {
                    return { ...block, content };
                }
                if (block.children) {
                    return {
                        ...block,
                        children: updateBlockContent(
                            block.children,
                            id,
                            content,
                        ),
                    };
                }
                return block;
            });
        };

        setDroppedBlocks((prevBlocks) =>
            updateBlockContent(prevBlocks, block.id, value),
        );
    };

    const handleParticipantInput = (block: Block, participant: string) => {
        const updateBlockParticipant = (
            blocks: Block[],
            id: string,
            participant: string,
        ): Block[] => {
            return blocks.map((block) => {
                if (block.id === id) {
                    return { ...block, participant };
                }
                if (block.children) {
                    return {
                        ...block,
                        children: updateBlockParticipant(
                            block.children,
                            id,
                            participant,
                        ),
                    };
                }
                return block;
            });
        };

        setDroppedBlocks((prevBlocks) =>
            updateBlockParticipant(prevBlocks, block.id, participant),
        );
    };

    const handleDurationInput = (block: Block, duration: string) => {
        const updateBlockDuration = (
            blocks: Block[],
            id: string,
            duration: string,
        ): Block[] => {
            return blocks.map((block) => {
                if (block.id === id) {
                    return { ...block, duration };
                }
                if (block.children) {
                    return {
                        ...block,
                        children: updateBlockDuration(
                            block.children,
                            id,
                            duration,
                        ),
                    };
                }
                return block;
            });
        };

        setDroppedBlocks((prevBlocks) =>
            updateBlockDuration(prevBlocks, block.id, duration),
        );
    };

    const handleLoopInput = (block: Block, loopCount: string) => {
        const updateBlockLoopCount = (
            blocks: Block[],
            id: string,
            loopCount: string,
        ): Block[] => {
            return blocks.map((block) => {
                if (block.id === id) {
                    return { ...block, loopCount };
                }
                if (block.children) {
                    return {
                        ...block,
                        children: updateBlockLoopCount(
                            block.children,
                            id,
                            loopCount,
                        ),
                    };
                }
                return block;
            });
        };

        setDroppedBlocks((prevBlocks) =>
            updateBlockLoopCount(prevBlocks, block.id, loopCount),
        );
    };

    const generateScript = (blocks: Block[]): string => {
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
                            ? `get_int_variable( 'num_of_participant' )`
                            : `int_input(${block.loopCount})`;
                    script += `${indent}loop( ${loopCount} ) {`;
                    break;
                case 'block_command_letParticipant_speak':
                    const participant = block.participant
                        ? block.participant === '반복회차 i'
                            ? `get_num_of_iteration()`
                            : `int_input(${block.participant})`
                        : '';
                    const duration = block.duration
                        ? `int_input(${block.duration})`
                        : '';
                    script += `${indent}let_participant_speak( ${participant} , ${duration} );`;
                    break;
                case 'block_command_queryToGPT':
                    script += `${indent}let_ai_speak( get_answer_from_gpt_query( concat_string( `;
                    if (block.children && block.children.length > 0) {
                        script += block.children
                            .map((child) => generateBlockScript(child, 0))
                            .join(', ');
                    }
                    script += ` ) ) );`;
                    break;
                case 'block_string_input':
                    script += `string_input('${block.content}')`;
                    break;
                case 'block_getParticipantRecord_recent':
                    script += `get_recent_record(1)`;
                    break;
                case 'block_int_variable_num_of_participants':
                    script += `get_int_variable( 'num_of_participant' )`;
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
                // block.type !== 'block_string_input' &&
                // block.type !== 'block_getParticipantRecord_recent' &&
                // block.type !== 'block_command_queryToGPT'
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

    const parseScript = (script: string): Block[] => {
        const blocks: Block[] = [];
        const lines = script
            .split('}')
            .map((line) => line.trim() + '}')
            .filter((line) => line.trim() !== '}');

        const parseBlock = (
            lines: string[],
            indentLevel: number = 0,
        ): Block[] => {
            const result: Block[] = [];
            while (lines.length > 0) {
                const line = lines.shift()?.trim();
                if (!line) continue;
                const indent = line.match(/^\s*/)?.[0].length ?? 0;

                if (indent / 2 < indentLevel) break;

                const content = line.replace(/[{}]/g, '').trim();
                const [type, ...rest] = content.split(/\s+/);

                let block: Block;
                switch (type) {
                    case 'phase(1)':
                        block = {
                            id: uuidv4(),
                            type: 'block_flow_phase_1',
                            content: '1단계',
                        };
                        break;
                    case 'phase(2)':
                        block = {
                            id: uuidv4(),
                            type: 'block_flow_phase_2',
                            content: '2단계',
                        };
                        break;
                    case 'phase(3)':
                        block = {
                            id: uuidv4(),
                            type: 'block_flow_phase_3',
                            content: '3단계',
                        };
                        break;
                    case 'phase(4)':
                        block = {
                            id: uuidv4(),
                            type: 'block_flow_phase_4',
                            content: '4단계',
                        };
                        break;
                    case 'loop':
                        const loopCount =
                            rest.join(' ').match(/int_input\((.*)\)/)?.[1] ||
                            '';
                        block = {
                            id: uuidv4(),
                            type: 'block_flow_loop',
                            content: '반복 블록',
                            loopCount,
                        };
                        break;
                    case 'let_participant_speak':
                        const participant =
                            rest[0] === 'get_num_of_iteration()'
                                ? '반복회차 i'
                                : rest[0];
                        const duration = rest[1];
                        block = {
                            id: uuidv4(),
                            type: 'block_command_letParticipant_speak',
                            content: '발화 시작',
                            participant,
                            duration,
                        };
                        break;
                    case 'let_ai_speak':
                        block = {
                            id: uuidv4(),
                            type: 'block_command_queryToGPT',
                            content: 'GPT 블록',
                        };
                        break;
                    case 'string_input':
                        block = {
                            id: uuidv4(),
                            type: 'block_string_input',
                            content: rest.join(' '),
                        };
                        break;
                    case 'get_recent_record':
                        block = {
                            id: uuidv4(),
                            type: 'block_getParticipantRecord_recent',
                            content: '직전 발화자의 발화 내용',
                        };
                        break;
                    case 'get_int_variable':
                        block = {
                            id: uuidv4(),
                            type: 'block_int_variable_num_of_participants',
                            content: '현재 총 참여인원 수',
                        };
                        break;
                    case 'get_num_of_iteration':
                        block = {
                            id: uuidv4(),
                            type: 'block_iteration_index',
                            content: '반복회차 i',
                        };
                        break;
                    default:
                        continue;
                }

                if (line.endsWith('{')) {
                    block.children = parseBlock(lines, indent / 2 + 1);
                }

                result.push(block);
            }
            return result;
        };

        blocks.push(...parseBlock(lines));
        return blocks;
    };

    // useEffect(() => {
    //     if (data.fb_script && droppedBlocks.length === 0) {
    //         const parsedBlocks = parseScript(data.fb_script);
    //         setDroppedBlocks(parsedBlocks);
    //     }
    // }, [data.fb_script, droppedBlocks.length]);

    useEffect(() => {
        setFbScript(generateScript(droppedBlocks));
    }, [droppedBlocks]);

    useEffect(() => {
        console.log(fbScript);
        setData({ ...data, script: fbScript }); // Add this line to update formData with fb_script
    }, [fbScript]);

    const hasPhaseBlock = droppedBlocks.some((block) =>
        block.type.startsWith('block_flow_phase'),
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="LAYOUT-pageRoot w-[1200px] flex flex-col items-center justify-center h-auto min-h-full">
                <div className="LAYOUT-formBoxContentsArea bg-dr-dark-200 w-full max-w-[80%] h-auto min-h-full mx-auto p-8 rounded-md">
                    <div className="flex flex-row w-full h-auto min-h-full justify-between">
                        <div className="LEFT-BLOCK-CONTAINER w-[30%] h-full bg-dr-gray-500 p-4 sticky top-8 rounded-sm">
                            <div className="LEFT-BLOCKS-BOX bg-dr-dark-300 w-full h-full flex flex-col gap-2 px-2 py-2">
                                {blocks.map((block) => (
                                    <DraggableBlock
                                        key={block.id}
                                        block={block}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="DIVIDER-VERTICAL bg-dr-gray-500 w-[2px] rounded-full"></div>
                        <div className="RIGHT-ASSEMBLY-CONTAINER rounded-sm w-[65%] h-full min-h-full bg-dr-gray-500 p-4">
                            <DroppableArea
                                onDrop={handleDrop}
                                hasPhaseBlock={hasPhaseBlock}
                                onDelete={deleteBlock}
                            >
                                {droppedBlocks.map((block) => (
                                    <DroppableBlock
                                        key={block.id}
                                        block={block}
                                        onDrop={handleDrop}
                                        onDelete={deleteBlock}
                                        onStringInput={handleStringInput}
                                        onParticipantInput={
                                            handleParticipantInput
                                        }
                                        onDurationInput={handleDurationInput}
                                        onLoopInput={handleLoopInput}
                                    >
                                        {block.children &&
                                            block.children.map((child) => (
                                                <DroppableBlock
                                                    key={child.id}
                                                    block={child}
                                                    onDrop={handleDrop}
                                                    onDelete={deleteBlock}
                                                    onStringInput={
                                                        handleStringInput
                                                    }
                                                    onParticipantInput={
                                                        handleParticipantInput
                                                    }
                                                    onDurationInput={
                                                        handleDurationInput
                                                    }
                                                    onLoopInput={
                                                        handleLoopInput
                                                    }
                                                >
                                                    {child.children &&
                                                        child.children.map(
                                                            (grandchild) => (
                                                                <DroppableBlock
                                                                    key={
                                                                        grandchild.id
                                                                    }
                                                                    block={
                                                                        grandchild
                                                                    }
                                                                    onDrop={
                                                                        handleDrop
                                                                    }
                                                                    onDelete={
                                                                        deleteBlock
                                                                    }
                                                                    onStringInput={
                                                                        handleStringInput
                                                                    }
                                                                    onParticipantInput={
                                                                        handleParticipantInput
                                                                    }
                                                                    onDurationInput={
                                                                        handleDurationInput
                                                                    }
                                                                    onLoopInput={
                                                                        handleLoopInput
                                                                    }
                                                                >
                                                                    {grandchild.children &&
                                                                        grandchild.children.map(
                                                                            (
                                                                                grandgrandchild,
                                                                            ) => (
                                                                                <DroppableBlock
                                                                                    key={
                                                                                        grandgrandchild.id
                                                                                    }
                                                                                    block={
                                                                                        grandgrandchild
                                                                                    }
                                                                                    onDrop={
                                                                                        handleDrop
                                                                                    }
                                                                                    onDelete={
                                                                                        deleteBlock
                                                                                    }
                                                                                    onStringInput={
                                                                                        handleStringInput
                                                                                    }
                                                                                    onParticipantInput={
                                                                                        handleParticipantInput
                                                                                    }
                                                                                    onDurationInput={
                                                                                        handleDurationInput
                                                                                    }
                                                                                    onLoopInput={
                                                                                        handleLoopInput
                                                                                    }
                                                                                ></DroppableBlock>
                                                                            ),
                                                                        )}
                                                                </DroppableBlock>
                                                            ),
                                                        )}
                                                </DroppableBlock>
                                            ))}
                                    </DroppableBlock>
                                ))}
                            </DroppableArea>
                        </div>
                    </div>
                    <div className="w-full h-max flex flex-row justify-end gap-2">
                        <Button size="md" onClick={onBack} color="dark">
                            이전으로
                        </Button>
                        <Button size="md" onClick={onNext}>
                            다음으로
                        </Button>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Step3;

const DraggableBlock: React.FC<{ block: Block }> = ({ block }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: block,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const dragRef = useRef<HTMLDivElement>(null);
    drag(dragRef);

    return (
        <div
            ref={dragRef}
            className={`UNIT-BLOCK w-full min-h-9 p-2 cursor-pointer ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}
            style={{ backgroundColor: getBlockColor(block.type) }}
        >
            {block.content}
        </div>
    );
};

const getBlockColor = (type: BlockType): string => {
    switch (type) {
        case 'block_flow_phase_1':
        case 'block_flow_phase_2':
        case 'block_flow_phase_3':
        case 'block_flow_phase_4':
            return 'red';
        case 'block_flow_loop':
            return 'darkred';
        case 'block_command_queryToGPT':
            return 'violet';
        case 'block_command_letParticipant_speak':
            return 'blue';
        case 'block_string_input':
            return 'yellow';
        case 'block_getParticipantRecord_recent':
            return 'gray';
        case 'block_int_variable_num_of_participants':
            return 'green';
        case 'block_iteration_index':
            return 'orange';
        default:
            return 'gray';
    }
};

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
                if (
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

    return (
        <div
            ref={dropRef}
            className={`UNIT-BLOCK animate-popIn relative ${
                isOver ? 'bg-dr-dark-200' : ''
            } border-opacity-0 border-dr-coral-300 ${
                canDrop ? 'border-2 border-opacity-100' : ''
            } rounded-md w-full my-2 min-h-20 h-auto transition-all duration-300`}
            style={{ backgroundColor: getBlockColor(block.type) }}
        >
            <div className="flex flex-row h-auto gap-2 justify-between">
                {block.type !== 'block_string_input' && (
                    <div className="HEAD rounded-tl-md rounded-br-md bg-black text-dr-white h-full min-w-[100px] p-1">
                        {block.content}
                    </div>
                )}

                <button
                    className={`w-6 h-6 m-1 p-1  rounded-full hover:text-gray-500 transition-colors duration-200 justify-end ${
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
                        placeholder="입력 후 엔터"
                        onBlur={handleStringChange}
                        className="bg-transparent border-none outline-none text-dr-black bg-white w-full resize-none h-16 p-2 text-dr-body-3"
                        rows={4}
                    />
                )}
                {block.type === 'block_command_letParticipant_speak' && (
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            placeholder="번째 참가자"
                            value={
                                block.participant === '반복회차 i'
                                    ? '반복회차 i'
                                    : block.participant || ''
                            }
                            onChange={handleParticipantChange}
                            className="bg-transparent border-none outline-none text-dr-black bg-white rounded-md w-1/4 text-dr-body-4 text-center"
                        />
                        <span>번째 참가자</span>
                        <input
                            type="number"
                            placeholder="초 동안"
                            value={block.duration || ''}
                            onChange={handleDurationChange}
                            className="bg-transparent border-none outline-none text-dr-black bg-white rounded-md w-1/6 text-center text-dr-body-4"
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
                            className="bg-transparent border-none outline-none text-dr-black bg-white w-1/3 rounded-md text-center text-dr-body-4"
                        />
                        <div>번 반복</div>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

const DroppableArea: React.FC<{
    onDrop: (block: Block) => void;
    hasPhaseBlock: boolean;
    onDelete: (block: Block) => void;
    children: ReactNode;
}> = ({ onDrop, hasPhaseBlock, onDelete, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item: Block, monitor: DropTargetMonitor) => {
            if (!monitor.didDrop()) {
                if (hasPhaseBlock || item.type.startsWith('block_flow_phase')) {
                    onDrop({ ...item, id: uuidv4() });
                } else {
                    alert('단계 블록을 먼저 추가해야 합니다.');
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: Block) =>
            hasPhaseBlock || item.type.startsWith('block_flow_phase'),
    });

    const dropRef = useRef<HTMLDivElement>(null);
    drop(dropRef);

    return (
        <div
            ref={dropRef}
            className={`DROPPABLE_AREA bg-dr-dark-200 w-full h-auto min-h-full flex flex-col px-2 py-2 ${
                isOver ? 'bg-dr-dark-100' : ''
            } border-opacity-0 border-dr-coral-300 ${
                canDrop ? 'border-2 border-opacity-100' : ''
            } transition-all duration-300`}
        >
            <div className="text-dr-coral-200 font-bold">
                {isOver ? '내려놓을 수 있음' : '블록 끌어오셈'}
            </div>

            {children}
        </div>
    );
};

type BlockType =
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

interface Block {
    id: string;
    type: BlockType;
    content: string;
    children?: Block[];
    participant?: string;
    duration?: string;
    loopCount?: string;
}

const blocks: Block[] = [
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

const validChildBlocks: Record<BlockType, BlockType[]> = {
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
