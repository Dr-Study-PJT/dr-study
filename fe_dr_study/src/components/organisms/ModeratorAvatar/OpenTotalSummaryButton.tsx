import Icon from '@/components/atoms/Icon/Icon';
import React from 'react';

interface OpenTotalSummaryButtonProps {
    prevSummary: string;
}

const OpenTotalSummaryButton = ({
    prevSummary,
}: OpenTotalSummaryButtonProps) => {
    return (
        <div className="cursor-pointer overflow-hidden rounded-lg ">
            {prevSummary && prevSummary !== 'undefined' && (
                <p className="text-dr-white text-dr-body-4 p-4">
                    이전 대화: {prevSummary.slice(0, 10)}...
                </p>
            )}
        </div>
    );
};

export default OpenTotalSummaryButton;
