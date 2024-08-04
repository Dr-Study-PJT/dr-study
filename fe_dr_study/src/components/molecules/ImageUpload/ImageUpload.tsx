'use client';

import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { tv } from 'tailwind-variants';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { showToast } from '@/utils/toastUtil';
import 'react-toastify/dist/ReactToastify.css';

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
    const { control } = useForm();
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'members');

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/v1/images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            const imageId = response.data.data.imageId;

            setImageDisplay && setImageDisplay(imageId);
            setImage(URL.createObjectURL(file));

            if (setBodyData) {
                setBodyData((prevData: any) => ({
                    ...prevData,
                    imageId,
                }));
            }

            showToast('success', '이미지 업로드 성공!');
        } catch (error) {
            console.error('Image upload failed:', error);

            showToast('error', '이미지 업로드 실패!');
        }
    };

    const onFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                handleImageUpload(file);
            }
        },
        [],
    );

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleImageUpload(file);
        }
    }, []);

    const preventDefault = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <ToastContainer position="bottom-right" />
            <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <div className="p-8 bg-dr-coral-50 rounded-full">
                        <div
                            className={shapeVariants({ shape })}
                            onDrop={onDrop}
                            onDragOver={preventDefault}
                            onDragEnter={preventDefault}
                            onDragLeave={preventDefault}
                        >
                            <label className="flex flex-col items-center justify-center cursor-pointer text-dr-coral-300 ">
                                {image ? (
                                    <Image
                                        src={image}
                                        alt="Uploaded"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <FaPlus className="text-lg " />
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={onFileChange}
                                />
                            </label>
                        </div>
                    </div>
                )}
            />
        </>
    );
};

export default ImageUpload;
