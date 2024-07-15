/* eslint-disable react/prop-types */
import {
  TextH1,
  InputForm,
  InputTextArea,
  InputFile,
  BreadCreumbAdmin,
} from "src/components";
import { path } from "src/utils/path";
import { useForm } from "react-hook-form";
import Button from "src/components/common/button";
import { apiGetCategory } from "src/apis/category";
import { toast } from "react-toastify";
import withRouter from "src/hocs/withRouter";

const CreatePropertyType = ({ navigate }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { image, ...payload } = data;
    const response = await apiGetCategory({
      image: image[0],
      ...payload,
    });
    if (response.success) {
      toast.success(response.msg);
      reset;
      navigate(`/${path.ADMIN}/${path.PROPERTY_TYPE}`);
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4 pt-0">
        <TextH1 title="Create Property Type" />
        <BreadCreumbAdmin />
      </div>
      <div className="w-1/2 rounded-md shadow-md p-4 bg-white">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label="Title"
            id="title"
            placeholder="Enter title..."
            validate={{ required: "This field can't be empty!" }}
            errors={errors}
            register={register}
          />
          <InputTextArea
            label="Description"
            id="description"
            placeholder="Enter description..."
            validate={{ required: "This field can't be empty!" }}
            errors={errors}
            register={register}
            setValue={setValue}
          />
          <InputFile
            title="Image"
            id="image"
            setValue={setValue}
            errors={errors}
            register={register}
            getValues={getValues}
            validate={{ required: "This field can't be empty!" }}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-main-700 px-3 py-2 w-full text-white rounded-md"
            text="Create new"
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(CreatePropertyType);
