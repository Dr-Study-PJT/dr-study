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
    size: keyof typeof iconStyles.variants.size;
    cursor?: keyof typeof iconStyles.variants.cursor;
    icon: 'house' | 'people' | 'person' | 'globe' | 'arrowLeft';
    text?: keyof typeof iconStyles.variants.text;
    bg?: keyof typeof iconStyles.variants.bg;
    active?: boolean;
}
