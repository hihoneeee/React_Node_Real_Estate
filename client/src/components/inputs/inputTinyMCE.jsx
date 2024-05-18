/* eslint-disable react/prop-types */
import { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const InputTinyMCE = ({
  containerClassName,
  label,
  register,
  errors,
  id,
  validate,
  setValue,
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-3", containerClassName))}>
      {label && (
        <label className="lg:text-sm text-xs font-bold capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      <Editor
        id={id}
        {...register(id, validate)}
        onChange={(e) => setValue(id, e.target.getContent())}
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {errors && errors[id] && (
        <smal className="text-red-500 italic lg:text-xs text-xxs">
          {errors[id]?.message}
        </smal>
      )}
    </div>
  );
};

export default memo(InputTinyMCE);
