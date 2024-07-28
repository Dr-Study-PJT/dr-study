'use client';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({
    children,
    type = 'button',
    color = 'coral',
    size = 'md',
    onClick,
    disabled = false,
    outlined = false,
    rounded = false,
    fullWidth = false,
}: ButtonProps) => {
    const className = buttonStyles({
        color: outlined ? `outlined_${color}` : 'dark',
        size,
        bg: outlined ? 'none' : color,
        borderColor: outlined ? color : 'none',
        rounded,
        outlined,
        fullWidth,
    });

    const fontSize = {
        lg: '0.875rem',
        md: '0.700rem',
        sm: '0.500rem',
    };

    return (
        <button
            type={type}
            style={{ fontSize: fontSize[size] }}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
