import { ReactNode } from 'react';

import { iconStyles } from './Icon.styles';

export type IconKeyValue = {
  house: ReactNode;
  people: ReactNode;
  person: ReactNode;
  globe: ReactNode;
  arrowLeft: ReactNode;
};

export interface IconInterface {
  // 아이콘 이름 추가
  icon: 'house' | 'people' | 'person' | 'globe' | 'arrowLeft';
  size?: keyof typeof iconStyles.variants.size;
  shape?: 'square' | 'rounded' | 'circle';
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  bg?: 'primary' | 'gray' | 'black' | 'white' | 'none';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
}
