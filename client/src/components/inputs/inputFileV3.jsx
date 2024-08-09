import clsx from "clsx";
import uploadImage from "src/assets/upload-image.png";
import { twMerge } from "tailwind-merge";
import { useState, useEffect, memo } from "react";
import { CgSpinner } from "react-icons/cg";
import icons from "src/utils/icons";
const { TiDelete } = icons;

const InputFileV3 = ({
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
    const tempImagesArr = [];

    setIsLoading(true);

    for (let file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        tempImagesArr.push({
          id: file.name, // or any unique identifier
          path: reader.result, // base64 string
        });

        if (multiple) {
          setImages((prevImages) => [...prevImages, ...tempImagesArr]);
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

        setIsLoading(false);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
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

export default memo(InputFileV3);
