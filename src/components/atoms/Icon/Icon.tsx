import React from 'react';
import {
  BsHouseDoor,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsGlobe2,
} from 'react-icons/bs';

const Icon = () => {
  return (
    <>
      <button className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <BsHouseDoor />
      </button>
      <button className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <BsFillPeopleFill />
      </button>
      <button className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <BsFillPersonFill />
      </button>
      <button className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <BsGlobe2 />
      </button>
    </>
  );
};

export default Icon;
