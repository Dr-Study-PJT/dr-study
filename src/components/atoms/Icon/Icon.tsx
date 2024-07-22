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
export const Icon = ({
  icon,
  size,
  color,
  shape,
  bg,
  shadow,
  active,
}: IconInterface) => {
  const iconElement = React.cloneElement(iconName[icon], { size });

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
      {iconElement}
    </span>
  );
};

export default Icon;
