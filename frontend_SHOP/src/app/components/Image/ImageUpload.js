import React, { Fragment, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ImageUpload = ({
  onChange = () => {},
  name = "",
  setValue,
  getValues = "",
  className = "w-[200px] h-[200px] ",
}) => {
  const [showImage, setShowImage] = useState("");
  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files;
      console.log(file[0]);
      if (!file) return;
      const bodyFormData = new FormData();
      bodyFormData.append("image", file[0]);
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_IMGBB_API}`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(
        "🚀 ~ file: ImageUpload.js:21 ~ handleUploadImage ~ response:",
        response
      );
      const imageData = response.data.data;

      if (!imageData) {
        toast.error("Can not upload image to imgbbAPI");
        return;
      }

      const imageObj = {
        medium: imageData?.medium?.url,
        thumb: imageData?.thumb?.url,
        url: imageData?.url,
      };
      onChange(name, imageObj);

      setShowImage(imageObj.url);
    } catch (error) {
      // để tạm
      const imageObj = {
        url: "https://i.ytimg.com/vi/Yxv5Rk3-d1A/maxresdefault.jpg",
      };
      console.log("🚀 ~ handleUploadImage ~ error:", error);
    }
  };

  useEffect(() => {
    setShowImage(getValues); //khi mới đầu vào cho nó load ảnh lên
  }, [getValues]);

  const handleDeleteImage = async () => {
    setShowImage("");
    setValue && setValue(name, "");
  };
  return (
    <div className="inline-flex">
      <label
        className={`  border border-gray-200  border-dashed overflow-hidden ${
          showImage && "pointer-events-none"
        }   group cursor-pointer flex items-center justify-center ${className}`}
      >
        <input type="file" onChange={handleUploadImage} className="hidden" />

        {!showImage && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        )}
        {showImage && (
          <img
            src={showImage}
            className="w-full h-full object-cover  "
            alt=""
          />
        )}
      </label>
      {showImage && (
        <div>
          <button
            type="button"
            className={`w-14 h-14 flex  ml-3  items-center bg-white text-red-500`}
          >
            <span onClick={handleDeleteImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
