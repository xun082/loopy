import React, { useRef, useState } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '@/utils';

interface ImageUploaderProps {
  onUpload: (image: string) => void;
  accept?: Accept;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<null | string>(null);

  // 使用 react-dropzone 处理拖拽上传
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImage(reader.result);
          }
        };

        reader.readAsDataURL(file);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
      onUpload(reader.result as string);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    setImage(null);
    e.stopPropagation();
  };

  return (
    <div className="space-y-4">
      {/* 上传按钮和拖拽区域 */}
      <div
        {...getRootProps()}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer hover:border-gray-500',
          !image && 'text-gray-500',
        )}
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {image ? (
          <>
            <div className="relative">
              <img src={image} alt="Preview" className="object-cover mx-auto rounded-lg" />
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700"
            >
              <Cross2Icon />
            </button>
          </>
        ) : (
          <p>拖动或点击选择图片</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
