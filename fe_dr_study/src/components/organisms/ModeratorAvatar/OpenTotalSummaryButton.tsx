import Icon from '@/components/atoms/Icon/Icon';
import React from 'react';

interface OpenTotalSummaryButtonProps {
    prevSummary: string;
}

const OpenTotalSummaryButton = ({
    prevSummary,
}: OpenTotalSummaryButtonProps) => {
    console.log('prevSummary:', prevSummary);
    return (
        <div className="cursor-pointer overflow-hidden rounded-full ">
            {prevSummary && prevSummary !== 'undefined' && (
                <p className="text-dr-white">
                    이전 대화: "{prevSummary.slice(0, 10)}..."
                </p>
            )}
        </div>
    );
};

export default OpenTotalSummaryButton;
