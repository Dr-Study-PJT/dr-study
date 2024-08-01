import { ReactNode } from 'react';

import { iconStyles } from './Icon.styles';

export type IconKeyValue = {
    house: ReactNode;
    people: ReactNode;
    person: ReactNode;
    globe: ReactNode;
    arrowLeft: ReactNode;
    gear: ReactNode;
    phoneCall: ReactNode;
    videoOn: ReactNode;
    videoOff: ReactNode;
    micOn: ReactNode;
    micOff: ReactNode;
    // 아이콘 이름 추가
};

export interface IconInterface {
    size: keyof typeof iconStyles.variants.size;
    cursor?: keyof typeof iconStyles.variants.cursor;
    icon: keyof IconKeyValue;
    text?: keyof typeof iconStyles.variants.text;
    shape?: keyof typeof iconStyles.variants.shape;
    bg?: keyof typeof iconStyles.variants.bg;
    active?: boolean;
    hover?: keyof typeof iconStyles.variants.hover;
    className?: string;
    disabled?: boolean;
}
