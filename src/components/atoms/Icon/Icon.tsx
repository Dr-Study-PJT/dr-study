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

// 아이콘 추가 시, 아이콘 이름 타입도 같이 추가
const iconName: IconKeyValue = {
  house: <BsHouseDoor />,
  people: <BsFillPeopleFill />,
  person: <BsFillPersonFill />,
  globe: <BsGlobe2 />,
  arrowLeft: <BsArrowLeft />,
};

// Icon 컴포넌트
export const Icon = ({
  icon,
  size,
  color,
  shape,
  bg,
  shadow,
  active,
}: IconInterface) => {
  return (
    <span
      className={iconStyles({
        size,
        color,
        shape,
        bg,
        shadow,
        active: active ? true : false,
      })}
    >
      {iconName[icon]}
    </span>
  );
};

export default Icon;
