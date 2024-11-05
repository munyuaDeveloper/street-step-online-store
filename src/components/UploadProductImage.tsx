/* eslint-disable no-undef */
import { ChangeEvent, useState } from "react";
import { MdCloudUpload, MdDeleteForever } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import React from "react";
import { UploadProductImageProps } from "../interfaces/interface";

const UploadProductImage = ({ setProductImgUrls }: UploadProductImageProps) => {
  const [productImages, setProductImages] = useState<string[]>([]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    const uploadMultipleFiles = async () => {
      for (let i = 0; i < file!.length; i++) {
        const cloudinaryResponse = await uploadImage(file![i]);
        setProductImages((prev) => {

          const updatedImgs = [...prev, cloudinaryResponse.url];
          setProductImgUrls(updatedImgs);
          return updatedImgs;
        });
      }
    };
    uploadMultipleFiles()
  };

  const handleDeleteImg = (index: number) => {
    setProductImages((prev) => {
      const imgs = [...prev];
      imgs.splice(index, 1);
      return imgs;
    });
  };

  return (
    <>
      <div>
        <label
          htmlFor="uploadProductImage"
          className="bg-slate-200 flex flex-col items-center justify-center h-[100px] rounded-md cursor-pointer"
        >
          <MdCloudUpload className="text-4xl" />
          <h2 className="text-lg">Upload Product Images</h2>
        </label>
        <input
          type="file"
          id="uploadProductImage"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <div className="flex gap-3">
        {productImages.map((img, index) => (
          <div key={img} className="relative group">
            <MdDeleteForever
              onClick={() => handleDeleteImg(index)}
              className="absolute top-0 right-0 text-red-500 text-2xl z-10 cursor-pointer mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <img src={img} className="w-[80px] cursor-zoom-in border rounded" />
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadProductImage;
