import React from 'react';

interface ToolTipProps {
    isVisible: boolean;
    content: string;
}

const ToolTip = ({ isVisible, content }: ToolTipProps) => {
    return (
        <div>
            {isVisible && (
                <span className="tooltip-text absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-3 -mt-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    {content}
                </span>
            )}
        </div>
    );
};

export default ToolTip;
