'use client';

import Image from 'next/image';
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    isValidElement,
    useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { tv } from 'tailwind-variants';

const shapeVariants = tv({
    base: 'w-10 h-10 border-[1.5px] border-dashed border-gray-400 flex items-center justify-center overflow-hidden border-dr-coral-300',
    variants: {
        shape: {
            square: '',
            'rounded-square': 'rounded-lg',
            circle: 'rounded-full',
        },
    },
});

interface ImageUploadProps {
    bodyData?: any;
    setBodyData?: Dispatch<SetStateAction<any>>;
    setImageDisplay?: Dispatch<SetStateAction<any>>;
    shape?: 'square' | 'rounded-square' | 'circle';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    bodyData,
    setBodyData,
    setImageDisplay,
    shape = 'circle',
}) => {
    const { control, setValue } = useForm();
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setValue('image', file);
                if (setBodyData) {
                    setBodyData({
                        ...bodyData,
                        file,
                    });
                }
                console.log(setBodyData, setImageDisplay);
                if (setImageDisplay) {
                    setImageDisplay(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Controller
            name="image"
            control={control}
            render={({ field }) => (
                <div className="p-8 bg-dr-coral-50 rounded-full">
                    <div className={shapeVariants({ shape })}>
                        <label className="flex flex-col items-center justify-center cursor-pointer text-dr-coral-300 ">
                            <FaPlus className="text-lg " />
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                </div>
            )}
        />
    );
};

export default ImageUpload;
