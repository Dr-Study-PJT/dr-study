import React from 'react';

interface ToolTipProps {
    isVisible: boolean;
    content: string;
}

const ToolTip = ({ isVisible, content }: ToolTipProps) => {
    return (
        <>
            {isVisible && (
                <div className="px-2 py-[2px]">
                    <span>{content}</span>
                </div>
            )}
        </>
    );
};

export default ToolTip;
