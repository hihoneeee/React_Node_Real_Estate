/* eslint-disable react/prop-types */
import clsx from "clsx";
import uploadImage from "src/assets/upload-image.png";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { apiUploadImages } from "src/apis/apiOutside";
import { CgSpinner } from "react-icons/cg";
import icons from "src/utils/icons";
import { toast } from "react-toastify";
const { TiDelete } = icons;

const InputFile = ({
  title,
  containerClassName,
  validate,
  id,
  multiple,
  setValue,
  errors,
  register,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    let formData = new FormData();
    let imageLinkPromises = [];
    setIsLoading(true);

    for (let file of files) {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_UPLOAD_ASSETS_NAME
      );
      imageLinkPromises.push(apiUploadImages(formData));
    }
    const response = await Promise.all(imageLinkPromises);
    setIsLoading(false);
    if (response && response.length > 0) {
      const tempImagesArr = [];
      for (let result of response) {
        if (result.status === 200) {
          tempImagesArr.push({
            id: result.data.public_id,
            path: result.data.secure_url,
          });
        }
      }
      if (multiple) {
        setImages((prevImages) => [...tempImagesArr, ...prevImages]);
        setValue(id, [
          ...tempImagesArr.map((img) => img.path),
          ...images.map((img) => img.path),
        ]);
      } else {
        setImages(tempImagesArr);
        setValue(
          id,
          tempImagesArr.map((img) => img.path)
        );
      }
    } else toast.error("Something is wrong!");
  };

  const handleDeleteImg = (imageId) => {
    const updatedImages = images.filter((item) => item.id !== imageId);
    setImages(updatedImages);
    setValue(
      id,
      updatedImages.map((img) => img.path)
    );
  };

  useEffect(() => {
    register(id, validate);
  }, [register, id, validate]);

  return (
    <div className={twMerge(clsx("flex flex-col gap-3", containerClassName))}>
      <small className="lg:text-sm text-xs font-bold capitalize">{title}</small>
      <div className="w-full">
        <label
          className="w-full border-dashed border-4 p-12 cursor-copy flex flex-col items-center justify-center gap-4"
          htmlFor={id}
        >
          {isLoading ? (
            <span className="animate-spin text-2xl">
              <CgSpinner />
            </span>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-[3rem] h-[2.5rem] object-cover"
                src={uploadImage}
                alt="img"
              />
              <span className="font-semibold lg:text-xs text-xxs italic text-gray-400 mt-2">
                Only support image with extension JPEG, PNG, JPG!
              </span>
            </div>
          )}
        </label>
        <input
          hidden
          type="file"
          multiple={multiple}
          id={id}
          onChange={handleFileChange}
        />
      </div>

      {errors && errors[id] && (
        <small className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </small>
      )}
      <div className="w-full">
        <h3 className="lg:text-sm text-xs font-bold capitalize">Preview</h3>
        <div className="flex items-center gap-4">
          {images?.map((item) => (
            <div className="w-[10rem] h-[10rem] relative" key={item.id}>
              <img
                src={item.path}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
              <span
                title="Delete"
                onClick={() => handleDeleteImg(item.id)}
                className="absolute cursor-pointer top-1 right-1 text-xl hover:text-btnBackground"
              >
                <TiDelete />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputFile;
