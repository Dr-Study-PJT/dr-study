'use client';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({
    children,
    color = 'coral',
    size = 'md',
    onClick,
    disabled = false,
    outlined = false,
    rounded = false,
    fullWidth = false, // 새로운 prop 추가
}: ButtonProps) => {
    const className = buttonStyles({
        color,
        size,
        bg: outlined ? 'none' : color,
        borderColor: outlined ? color : 'none',
        rounded,
        outlined,
        fullWidth, // 스타일에 적용
    });

    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
