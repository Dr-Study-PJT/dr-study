import React, { ReactNode, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { Block } from './blockTypes';
import { v4 as uuidv4 } from 'uuid';

const DroppableArea: React.FC<{
    onDrop: (block: Block) => void;
    children: ReactNode;
}> = ({ onDrop, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item: Block, monitor: DropTargetMonitor) => {
            if (!monitor.didDrop()) {
                onDrop({ ...item, id: uuidv4() });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: Block) => item.type.startsWith('block_flow_phase'),
    });

    const dropRef = useRef<HTMLDivElement>(null);
    drop(dropRef);

    return (
        <div
            ref={dropRef}
            className={`DROPPABLE_AREA min-h-[10rem] rounded-lg bg-dr-coral-300 w-full h-auto flex flex-col px-2 py-2 ${
                isOver ? 'bg-dr-dark-100' : ''
            } border-opacity-0 border-dr-coral-300 ${
                canDrop ? 'border-2 border-opacity-100' : ''
            } transition-all duration-300`}
        >
            <div className="text-dr-white font-bold text-dr-body-4 ">
                {isOver ? '내려놓으세요.' : '블록을 추가하세요.'}
            </div>

            {children}
        </div>
    );
};

export default DroppableArea;
