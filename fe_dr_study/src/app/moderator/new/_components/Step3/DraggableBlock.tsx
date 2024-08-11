import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Block } from './blockTypes';

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

    const blockColors: { [key in Block['type']]: string } = {
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
        block_convenience_full_study_speak: 'bg-green-500 hover:bg-green-600',
    };

    return (
        <div
            ref={dragRef}
            className={`UNIT-BLOCK w-full min-h-9 p-2 px-3 rounded-xl cursor-pointer font-medium text-dr-body-4 animate-popIn ${
                isDragging ? 'opacity-50' : 'opacity-100'
            } ${blockColors[block?.type]} transition-colors durataion-300`}
        >
            {block?.content}
        </div>
    );
};

export default DraggableBlock;
