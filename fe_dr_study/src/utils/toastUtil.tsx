import { toast, ToastOptions } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import React from 'react';

export type ToastType = 'success' | 'error';

export const showToast = (type: ToastType, message: string) => {
    const toastProps: ToastOptions = {
        style: { backgroundColor: '#1a1a1a', color: 'white' },
        progressClassName: type === 'success' ? 'bg-dr-coral-300' : 'bg-dr-red',
    };

    toast(
        <div className="flex items-center">
            {type === 'success' ? (
                <FaCheckCircle className="mr-2 text-dr-coral-300" />
            ) : (
                <FaExclamationCircle className="mr-2 text-dr-red" />
            )}
            <span className="text-dr-body-4">{message}</span>
        </div>,
        toastProps,
    );
};
