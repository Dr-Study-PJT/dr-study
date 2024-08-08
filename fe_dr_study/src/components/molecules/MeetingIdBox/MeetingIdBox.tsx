import React, { ReactNode } from 'react';

const MeetingIdBox = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full">
            <div className="flex flex-col text-center">
                <p className="text-dr-body-3 text-dr-gray-300">Meeting URL:</p>
                <p className="text-dr-header-3 font-semibold">
                    {children}
                    {/* {`${process.env.NEXT_PUBLIC_HOST}/conference/${conferenceData?.id}`} */}
                </p>
            </div>
        </div>
    );
};

export default MeetingIdBox;
