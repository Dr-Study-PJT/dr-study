'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/atoms';
import { StepProps } from '../type';
import { Block, blocks } from './blockTypes';
import DraggableBlock from './DraggableBlock';
import DroppableBlock from './DroppableBlock';
import DroppableArea from './DroppableArea';
import { v4 as uuidv4 } from 'uuid';
import { generateScript } from './ScriptGenerator';
import Tutorial from './Tutorial';

const Step3: React.FC<StepProps & { initialBlocks?: Block[] }> = ({
    onNext,
    onBack,
    onSubmit,
    data,
    setData,
    initialBlocks = [],
}) => {
    const [droppedBlocks, setDroppedBlocks] = useState<Block[]>(initialBlocks);
    const [fbScript, setFbScript] = useState<string>('');
    const [blockFilter, setBlockFilter] = useState<string>('전체');
    const leftBlockContainerRef = useRef<HTMLDivElement>(null);

    const [showTutorial, setShowTutorial] = useState(true);
    const tutorialSteps = [
        {
            selector: '.LEFT-BLOCK-CONTAINER',
            content:
                '여기에는 사용할 수 있는 블록이 있습니다. 필요한 블록을 드래그하여 사용하세요.',
        },
        {
            selector: '.RIGHT-ASSEMBLY-CONTAINER',
            content: '여기에 블록을 드롭하여 스크립트를 생성할 수 있습니다.',
        },
    ];

    const handleTutorialClose = () => {
        setShowTutorial(false);
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

    const filteredBlocks = blocks.filter((block) => {
        if (blockFilter === '전체') return true;
        if (blockFilter === '단계') {
            return (
                block.type === 'block_flow_phase_1' ||
                block.type === 'block_flow_phase_2' ||
                block.type === 'block_flow_phase_3' ||
                block.type === 'block_flow_phase_4'
            );
        }
        if (blockFilter === '명령') {
            return (
                block.type === 'block_flow_loop' ||
                block.type === 'block_command_queryToGPT' ||
                block.type === 'block_command_letParticipant_speak'
            );
        }
        if (blockFilter === '변수') {
            return (
                block.type === 'block_string_input' ||
                block.type === 'block_getParticipantRecord_recent' ||
                block.type === 'block_int_variable_num_of_participants' ||
                block.type === 'block_iteration_index'
            );
        }
        if (blockFilter === '편의') {
            return block.type === 'block_convenience_full_study_speak';
        }
        return false;
    });

    useEffect(() => {
        const script = generateScript(droppedBlocks);
        console.log('Generated Script:', script);
        setFbScript(script);
    }, [droppedBlocks]);

    useEffect(() => {
        setData({ ...data, script: fbScript });
    }, [fbScript]);

    return (
        <div>
            {showTutorial && (
                <Tutorial steps={tutorialSteps} onClose={handleTutorialClose} />
            )}

            <DndProvider backend={HTML5Backend}>
                <div className="LAYOUT-pageRoot w-[1200px] flex flex-col items-center justify-center h-auto min-h-full">
                    <div className="LAYOUT-formBoxContentsArea border-[1px] bg-dr-indigo-200 border-dr-indigo-100 w-full max-w-[80%] h-auto min-h-full mx-auto p-8 rounded-lg">
                        <div className="TOTAL-AREA-CONTAINER h-[40rem] overflow-auto flex flex-row w-full min-h-full justify-between">
                            <div
                                className="LEFT-BLOCK-CONTAINER w-[38%] h-full  p-4 sticky top-3 self-start rounded-lg"
                                ref={leftBlockContainerRef}
                            >
                                <div className="BLOCK-SWITCH-BUTTONS w-full flex flex-col justify-between h-max gap-2 mb-2">
                                    <Button
                                        color={
                                            blockFilter === '편의'
                                                ? 'coral'
                                                : 'gray'
                                        }
                                        fullWidth
                                        onClick={() => setBlockFilter('편의')}
                                        classNameStyles="!h-7"
                                    >
                                        편의
                                    </Button>
                                    <div className="flex flex-row gap-2 w-full justify-between h-7">
                                        <Button
                                            color={
                                                blockFilter === '전체'
                                                    ? 'coral'
                                                    : 'gray'
                                            }
                                            onClick={() =>
                                                setBlockFilter('전체')
                                            }
                                        >
                                            전체
                                        </Button>
                                        <Button
                                            color={
                                                blockFilter === '단계'
                                                    ? 'coral'
                                                    : 'dark'
                                            }
                                            onClick={() =>
                                                setBlockFilter('단계')
                                            }
                                        >
                                            단계
                                        </Button>
                                        <Button
                                            color={
                                                blockFilter === '명령'
                                                    ? 'coral'
                                                    : 'dark'
                                            }
                                            onClick={() =>
                                                setBlockFilter('명령')
                                            }
                                        >
                                            명령
                                        </Button>
                                        <Button
                                            color={
                                                blockFilter === '변수'
                                                    ? 'coral'
                                                    : 'dark'
                                            }
                                            onClick={() =>
                                                setBlockFilter('변수')
                                            }
                                        >
                                            변수
                                        </Button>
                                    </div>
                                </div>
                                <div className="LEFT-BLOCKS-BOX bg-dr-indigo-100 rounded-lg w-full h-full flex flex-col gap-2 px-2 py-2">
                                    {filteredBlocks.map((block) => (
                                        <DraggableBlock
                                            key={block.id}
                                            block={block}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="DIVIDER-VERTICAL bg-dr-indigo-100 w-[1.5px] rounded-full"></div>
                            <div className="RIGHT-ASSEMBLY-CONTAINER rounded-md w-[65%] h-full min-h-full bg-dr-indigo-100 p-4">
                                <DroppableArea onDrop={handleDrop}>
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
                                            onDurationInput={
                                                handleDurationInput
                                            }
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
                                                                (
                                                                    grandchild,
                                                                ) => (
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
                            <Button
                                size="md"
                                onClick={(e) => onSubmit(e, data)}
                            >
                                제출하기
                            </Button>
                        </div>
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

export default Step3;
