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
    base: 'flex items-center justify-center overflow-hidden ',
    variants: {
        shape: {
            square: 'rounded-none',
            'rounded-square': 'rounded-lg',
            circle: 'rounded-full',
        },
    },
});

interface ImageUploadProps {
    bodyData?: any;
    setBodyData?: Dispatch<SetStateAction<any>>;
    setImageDisplay?: Dispatch<SetStateAction<any>>;
    setData?: Dispatch<SetStateAction<any>>; // 추가된 prop
    shape?: 'square' | 'rounded-square' | 'circle';
    type?: 'members' | 'conferences' | 'groups';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    bodyData,
    setBodyData,
    setImageDisplay,
    setData,
    shape = 'circle',
    type = 'members',
}) => {
    const { control } = useForm();
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('domain', type);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/v1/media`,
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

            if (setData) {
                setData((prevData: any) => ({
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
                    <div className="IMAGE-AREA w-28 h-28 bg-dr-coral-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors duration-300">
                        <div
                            className={`${shapeVariants({ shape })} relative w-full h-full cursor-pointer`}
                            onDrop={onDrop}
                            onDragOver={preventDefault}
                            onDragEnter={preventDefault}
                            onDragLeave={preventDefault}
                        >
                            {image ? (
                                <Image
                                    src={image}
                                    alt="Uploaded"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="border-dr-coral-300 border-[1.5px] border-dashed rounded-full p-3">
                                    <label className="flex flex-col items-center justify-center cursor-pointer text-dr-coral-300">
                                        <FaPlus className="text-lg" />
                                    </label>
                                </div>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={onFileChange}
                            />
                        </div>
                    </div>
                )}
            />
        </>
    );
};

export default ImageUpload;
