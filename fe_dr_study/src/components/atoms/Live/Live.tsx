import React from 'react';

const Live = () => {
    return (
        <div className="absolute w-[4.5rem] top-2 left-2 flex items-center bg-black rounded-full py-1 px-2">
            <div className="h-3 w-3 bg-red-500 rounded-full mr-1" />
            <span className="pl-1 text-white text-xs font-bold">LIVE</span>
        </div>
    );
};

export default Live;
