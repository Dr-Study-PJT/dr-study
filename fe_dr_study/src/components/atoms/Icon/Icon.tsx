import React from 'react';
import {
    BsHouseDoor,
    BsFillPeopleFill,
    BsFillPersonFill,
    BsGlobe2,
    BsArrowLeft,
} from 'react-icons/bs';

import { iconStyles } from './Icon.styles';
import { IconInterface, IconKeyValue } from './Icons.types';

const iconName: IconKeyValue = {
    house: <BsHouseDoor />,
    people: <BsFillPeopleFill />,
    person: <BsFillPersonFill />,
    globe: <BsGlobe2 />,
    arrowLeft: <BsArrowLeft />,
};

// Icon 컴포넌트
// any 타입 수정 !필요!
export const Icon = ({ icon, size, bg }: IconInterface) => {
    return (
        <div
            className={iconStyles({
                size,
                bg,
            })}
        >
            <div className=""></div>
            {iconName[icon]}
        </div>
    );
};

export default Icon;
