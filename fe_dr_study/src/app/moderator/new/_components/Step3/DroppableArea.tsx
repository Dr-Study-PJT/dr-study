import React, { ReactNode, useRef, useEffect } from 'react';
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
    });

    const dropRef = useRef<HTMLDivElement>(null);

    // Auto scroll logic
    useEffect(() => {
        const handleScroll = (event: MouseEvent) => {
            if (!dropRef.current) return;

            const boundingRect = dropRef.current.getBoundingClientRect();
            const scrollOffset = 20; // pixels to scroll per frame
            const scrollAreaHeight = 100; // pixels from the edge where scrolling starts

            // Scrolling down
            if (event.clientY > boundingRect.bottom - scrollAreaHeight) {
                dropRef.current.scrollBy({
                    top: scrollOffset,
                    behavior: 'smooth',
                });
            }
            // Scrolling up
            else if (event.clientY < boundingRect.top + scrollAreaHeight) {
                dropRef.current.scrollBy({
                    top: -scrollOffset,
                    behavior: 'smooth',
                });
            }
        };

        if (isOver) {
            document.addEventListener('mousemove', handleScroll);
        } else {
            document.removeEventListener('mousemove', handleScroll);
        }

        return () => {
            document.removeEventListener('mousemove', handleScroll);
        };
    }, [isOver]);

    drop(dropRef);

    return (
        <div
            ref={dropRef}
            className={`DROPPABLE_AREA min-h-[10rem] rounded-lg bg-dr-coral-300 w-full h-auto flex flex-col px-2 py-2 ${
                isOver ? 'bg-dr-dark-100' : ''
            } border-opacity-0 border-dr-coral-300 ${
                canDrop ? 'border-2 border-opacity-100' : ''
            } transition-all duration-300 overflow-y-auto`}
        >
            <div className="text-dr-white font-bold text-dr-body-4 ">
                {isOver ? '내려놓으세요.' : '블록을 추가하세요.'}
            </div>

            {children}
        </div>
    );
};

export default DroppableArea;
