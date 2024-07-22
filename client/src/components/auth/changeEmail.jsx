import { useAppStore } from "src/store/useAppStore";
import icons from "src/utils/icons";
import InputForm from "../inputs/inputForm";
import Button from "../common/button";
import { useForm } from "react-hook-form";
import { apiChangeEmail } from "src/apis/user";
import { toast } from "react-toastify";
import useLoading from "src/hooks/useLoading";
import Loading from "../common/loading";
const { MdCancel } = icons;
const ChangeEmail = () => {
  const { setModal } = useAppStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { loading, showLoading, hideLoading } = useLoading();

  const onSubmit = async (data) => {
    showLoading();
    const { ...payload } = data;
    console.log({ ...payload });
    const response = await apiChangeEmail(payload);
    if (response.success) {
      toast.success(response.message);
      hideLoading();
      setModal(false, "");
    } else {
      toast.error(response.message);
      hideLoading();
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="p-6 bg-white rounded-md w-[30%] space-y-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="borver-b p-4">
            <MdCancel
              className="absolute top-2 right-2 cursor-pointer lg:text-xl text-base hover:text-red-500 text-main-500"
              onClick={() => setModal(false, "")}
              size={18}
            />
            <h2 className="desktop:text-xl text-base font-bold capitalize text-center">
              Change Email Personal
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <InputForm
              register={register}
              id="mewEmail"
              label="New email"
              placeholder="Enter your new email..."
              validate={{ required: "This field can't emty!" }}
              errors={errors}
              containerClassName="w-full"
            />
            <InputForm
              register={register}
              id="currentPassword"
              label="Password"
              placeholder="Enter your password..."
              type="password"
              validate={{ required: "This field can't emty!" }}
              errors={errors}
              containerClassName="w-full"
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              className="bg-main-500 px-3 py-2 text-white rounded-md"
              text="Confirm"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeEmail;
