import React from 'react';
import {
    BsHouseDoor,
    BsFillPeopleFill,
    BsFillPersonFill,
    BsGlobe2,
    BsArrowLeft,
    BsFillGearFill,
} from 'react-icons/bs';

import { iconStyles } from './Icon.styles';
import { IconInterface, IconKeyValue } from './Icons.types';

const iconName: IconKeyValue = {
    house: <BsHouseDoor />,
    people: <BsFillPeopleFill />,
    person: <BsFillPersonFill />,
    globe: <BsGlobe2 />,
    arrowLeft: <BsArrowLeft />,
    gear: <BsFillGearFill />,
};

// Icon 컴포넌트
// any 타입 수정 !필요!
export const Icon = ({
    icon,
    text,
    size,
    bg,
    active,
    cursor,
    hover,
}: IconInterface) => {
    return (
        <div
            className={iconStyles({
                size,
                text,
                bg,
                active,
                cursor,
                hover,
            })}
        >
            <div className=""></div>
            {iconName[icon]}
        </div>
    );
};

export default Icon;
