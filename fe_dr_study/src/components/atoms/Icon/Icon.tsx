import React from 'react';
import {
    BsHouseDoor,
    BsFillPeopleFill,
    BsFillPersonFill,
    BsGlobe2,
    BsArrowLeft,
    BsFillGearFill,
    BsFillTelephoneFill,
    BsCameraVideo,
    BsCameraVideoOff,
    BsFillMicFill,
    BsFillMicMuteFill,
    BsXLg,
    BsFillSendFill,
    BsBoxArrowInRight,
    BsBell,
    BsBellFill,
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
    phoneCall: <BsFillTelephoneFill />,
    videoOn: <BsCameraVideo />,
    videoOff: <BsCameraVideoOff />,
    micOn: <BsFillMicFill />,
    micOff: <BsFillMicMuteFill />,
    xMark: <BsXLg />,
    send: <BsFillSendFill />,
    logout: <BsBoxArrowInRight />,
    bell: <BsBellFill />,
};

// Icon 컴포넌트
// any 타입 수정 !필요!
export const Icon = ({
    icon,
    text,
    size,
    bg,
    shape,
    active,
    cursor,
    hover,
    disabled,
    className,
}: IconInterface) => {
    return (
        <div
            className={iconStyles({
                size,
                text,
                bg,
                shape,
                active,
                cursor,
                disabled,
                hover,
            })}
        >
            <div className={className}></div>
            {iconName[icon]}
        </div>
    );
};

export default Icon;
