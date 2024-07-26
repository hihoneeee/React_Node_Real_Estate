import { useForm } from "react-hook-form";
import InputForm from "../inputs/inputForm";
import icons from "src/utils/icons";
const { FaSearch } = icons;
const MessgaeSidebar = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const mess = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
  ];

  return (
    <div className="w-[30%] space-y-3 p-2 rounded-r-md border-r">
      <h3 className="desktop:text-2xl laptop:text-xl text-base font-semibold text-main-500">
        Message chat
      </h3>
      <form className="relative">
        <InputForm
          id="first_name"
          placeholder="Enter search... "
          register={register}
          containerClassName="w-full py-0"
          errors={errors}
          isRequired={false}
        />
        <div className="absolute top-2 right-2 hover:cursor-pointer rounded-full hover:bg-overlay-30 p-2 text-gray-400 hover:text-main-600">
          <FaSearch size={12} />
        </div>
      </form>
      {mess?.length > 0 &&
        mess?.map((el) => (
          <div
            key={el.id}
            className="flex items-center gap-2 p-2 group hover:bg-overlay-10 rounded-lg cursor-pointer transition-all"
          >
            <div className="relative bg-transparent rounded-full">
              <img
                src="https://res.cloudinary.com/da7u0cpve/image/upload/v1721925064/dd7j4fzhzbzciz5dtndo.jpg"
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover "
              />
              <p className="h-3 w-3 bg-blue-500 rounded-full absolute right-0 bottom-0"></p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium desktop:text-base laptop:text-sm text-xs transition-all">
                  Hohi dayne
                </p>
                <span className="laptop:text-xs text-xxs text-gray-400 group-hover:text-gray-500">
                  1 hours ago
                </span>
              </div>
              <span className="text-gray-400 desktop:text-sm laptop:text-xs text-xxs group-hover:text-gray-500">
                Lorem Ipsum is simply textasd...
              </span>
            </div>
            <span></span>
          </div>
        ))}
    </div>
  );
};

export default MessgaeSidebar;
