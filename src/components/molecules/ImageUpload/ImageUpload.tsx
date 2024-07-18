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
  base: 'w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden',
  variants: {
    shape: {
      square: '',
      'rounded-square': 'rounded-lg',
      circle: 'rounded-full',
    },
  },
});

interface ImageUploadProps {
  bodyData: any;
  setBodyData?: Dispatch<SetStateAction<any>>;
  shape?: 'square' | 'rounded-square' | 'circle';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  bodyData,
  setBodyData,
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
        if (setBodyData) {
          setBodyData({
            ...bodyData,
            img_url: reader.result as string,
          });
        }
        setValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Controller
      name="image"
      control={control}
      render={({ field }) => (
        <div className={shapeVariants({ shape })}>
          {image ? (
            <Image
              width={100}
              height={100}
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500">
              <FaPlus className="text-2xl" />
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      )}
    />
  );
};

export default ImageUpload;
