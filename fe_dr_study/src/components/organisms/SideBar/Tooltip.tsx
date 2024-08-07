import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    text: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
    text,
    direction = 'right',
    children,
}) => {
    const [visible, setVisible] = React.useState(false);
    const [coords, setCoords] = React.useState({ top: 0, left: 0 });

    const handleMouseEnter = (event: React.MouseEvent) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const tooltipHeight = 40; // Estimated height of the tooltip
        const tooltipWidth = 100; // Estimated width of the tooltip
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;

        switch (direction) {
            case 'top':
                top -= tooltipHeight;
                left += rect.width / 2 - tooltipWidth / 2;
                break;
            case 'right':
                top += rect.height / 2 - tooltipHeight / 2;
                left += rect.width;
                break;
            case 'bottom':
                top += rect.height;
                left += rect.width / 2 - tooltipWidth / 2;
                break;
            case 'left':
                top += rect.height / 2 - tooltipHeight / 2;
                left -= tooltipWidth;
                break;
        }

        setCoords({ top, left });
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {visible &&
                createPortal(
                    <div
                        className={`fixed p-1 bg-dr-gray-500 text-white text-sm rounded shadow-lg z-50 animate-popIn !text-dr-body-5`}
                        style={{ top: coords.top, left: coords.left }}
                    >
                        {text}
                    </div>,
                    document.body,
                )}
        </div>
    );
};

export default Tooltip;
