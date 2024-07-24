'use client';
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';

type BlockType =
    | 'block_flow_phase_1'
    | 'block_flow_phase_2'
    | 'block_flow_phase_3'
    | 'block_flow_phase_4'
    | 'block_flow_loop'
    | 'block_command_queryToGPT'
    | 'block_command_letParticipant_speak'
    | 'block_string_concat'
    | 'block_string_input'
    | 'block_getParticiapntRecord_recent';

interface Block {
    id: string;
    type: BlockType;
    content: string;
    children?: Block[];
}

const blocks: Block[] = [
    { id: uuidv4(), type: 'block_flow_phase_1', content: '1단계' },
    { id: uuidv4(), type: 'block_flow_phase_2', content: '2단계' },
    { id: uuidv4(), type: 'block_flow_phase_3', content: '3단계' },
    { id: uuidv4(), type: 'block_flow_phase_4', content: '4단계' },
    { id: uuidv4(), type: 'block_flow_loop', content: '반복 블록' },
    { id: uuidv4(), type: 'block_command_queryToGPT', content: 'GPT 블록' },
    {
        id: uuidv4(),
        type: 'block_command_letParticipant_speak',
        content: '발화 시작',
    },
    {
        id: uuidv4(),
        type: 'block_getParticiapntRecord_recent',
        content: '직전 발화자의 발화 내용',
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
        'block_string_concat',
        'block_getParticiapntRecord_recent',
    ],
    block_command_letParticipant_speak: [],
    block_string_concat: [
        'block_string_input',
        'block_getParticiapntRecord_recent',
    ],
    block_string_input: [],
    block_getParticiapntRecord_recent: [],
};

const DraggableBlock: React.FC<{ block: Block }> = ({ block }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BLOCK',
        item: block,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`UNIT-BLOCK w-full min-h-14 p-2 cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
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
        case 'block_getParticiapntRecord_recent':
            return 'gray';
        default:
            return 'gray';
    }
};

const DroppableBlock: React.FC<{
    block: Block;
    onDrop: (block: Block, targetBlock: Block) => void;
    onDelete: (block: Block) => void;
}> = ({ block, onDrop, onDelete, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'BLOCK',
        drop: (item: Block, monitor) => {
            if (!monitor.didDrop()) {
                if (validChildBlocks[block.type].includes(item.type)) {
                    onDrop({ ...item, id: uuidv4() }, block);
                } else {
                    alert(
                        `유효하지 않은 블록입니다. ${block.type} 블록에는 ${validChildBlocks[block.type].join(', ')} 블록만 추가할 수 있습니다.`,
                    );
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: Block) =>
            validChildBlocks[block.type].includes(item.type),
    }));

    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete(block);
        }
    };

    return (
        <div
            ref={drop}
            className={`UNIT-BLOCK relative ${isOver ? 'bg-dr-dark-200' : ''} ${canDrop ? 'border-2 border-green-500' : ''} rounded-md w-full my-2 min-h-20 h-auto`}
            style={{ backgroundColor: getBlockColor(block.type) }}
        >
            {' '}
            <div className="flex flex-row h-auto gap-2 justify-between">
                <div className="HEAD rounded-tl-md rounded-br-md bg-black h-full min-w-[100px] p-1">
                    {block.content}
                </div>
                <div className="CHILDREN h-auto w-full">{children}</div>
                <button
                    className="w-6 h-6 m-1 p-1 bg-gray-200 rounded-full hover:bg-red-500"
                    onClick={handleDelete}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

const DroppableArea: React.FC<{
    onDrop: (block: Block) => void;
    hasPhaseBlock: boolean;
    onDelete: (block: Block) => void;
}> = ({ onDrop, hasPhaseBlock, onDelete, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'BLOCK',
        drop: (item: Block, monitor) => {
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
    }));

    return (
        <div
            ref={drop}
            className={`DROPPABLE_AREA bg-dr-dark-200 w-full h-auto min-h-full flex flex-col px-2 py-2 ${isOver ? 'bg-dr-dark-100' : ''} ${canDrop ? 'border-2 border-green-500' : ''}`}
        >
            {isOver ? '내려놓을 수 있음' : '블록 끌어오셈'}
            {children}
        </div>
    );
};

const CreateModeratorPage: React.FC = () => {
    const [droppedBlocks, setDroppedBlocks] = useState<Block[]>([]);

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
            // 최상위 블록으로 추가
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

    const hasPhaseBlock = droppedBlocks.some((block) =>
        block.type.startsWith('block_flow_phase'),
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="LAYOUT-pageRoot flex flex-col items-center justify-center w-full h-auto min-h-full bg-dr-black">
                <div className="LAYOUT-formBoxContentsArea bg-dr-dark-200 w-full max-w-[80%] h-auto min-h-full mx-auto p-8">
                    <div className="flex flex-row w-full h-auto min-h-full justify-between">
                        <div className="LEFT-BLOCK-CONTAINER w-[30%] h-full bg-dr-gray-500 p-4 sticky top-8">
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
                        <div className="RIGHT-ASSEMBLY-CONTAINER w-[65%] h-auto min-h-full bg-dr-gray-500 p-4">
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
                                    >
                                        {block.children &&
                                            block.children.map((child) => (
                                                <DroppableBlock
                                                    key={child.id}
                                                    block={child}
                                                    onDrop={handleDrop}
                                                    onDelete={deleteBlock}
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
                                                                ></DroppableBlock>
                                                            ),
                                                        )}
                                                </DroppableBlock>
                                            ))}
                                    </DroppableBlock>
                                ))}
                            </DroppableArea>
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default CreateModeratorPage;
