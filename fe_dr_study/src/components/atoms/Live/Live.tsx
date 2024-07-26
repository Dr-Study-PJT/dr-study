import React from 'react';

const Live = () => {
    return (
        <div className="absolute w-[2.5rem] top-1 left-1 flex items-center bg-black rounded-full py-[1px] px-1">
            <div className="h-2 w-2 bg-[#FF0000] rounded-full mr-1" />
            <span className="text-white text-[10px] font-bold">LIVE</span>
        </div>
    );
};

export default Live;
