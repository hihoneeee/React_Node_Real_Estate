import { useState } from "react";
import InputTextArea from "../inputs/inputTextArea";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Button from "../common/button";
import { Link } from "react-router-dom";
import icons from "src/utils/icons";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

const { HiOutlineMailOpen, FiPhone } = icons;

const DetailSidebar = ({ userData, propertyId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [select, setSelect] = useState("message");
  const [appointmentDate, setAppointmentDate] = useState(dayjs());
  const [backupDate, setbackupDate] = useState(dayjs());
  const handleBackupDate = (newValue) => {
    setbackupDate(newValue);
  };
  const handleAppointmentDate = (newValue) => {
    setAppointmentDate(newValue);
  };

  const onSubmitMessage = async (data) => {
    const { payload } = data;
    console.log(payload);
  };

  const onSubmitAppointment = async (data) => {
    const payload = {
      appointmentDate: appointmentDate.toISOString(),
      backupDate: backupDate.toISOString(),
      propertyId: propertyId,
      buyerId: userData.id,
    };
    console.log(payload);
  };

  return (
    <div className="bg-white w-[30%] shadow-2xl rounded-lg">
      <div className="flex items-center">
        <p
          onClick={() => {
            setSelect("message");
          }}
          className={twMerge(
            clsx(
              "w-1/2 py-2 text-center laptop:text-sm rounded-tl-lg text-xs font-semibold cursor-pointer transition-all hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)]",
              select === "message" && "border shadow-md transition-all"
            )
          )}
        >
          Request Info
        </p>
        <p
          onClick={() => {
            setSelect("schedule");
          }}
          className={twMerge(
            clsx(
              "w-1/2 py-2 text-center laptop:text-sm rounded-tl-lg text-xs font-semibold cursor-pointer transition-all hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)]",
              select === "schedule" && "border shadow-md transition-all"
            )
          )}
        >
          Schedule a tour
        </p>
      </div>
      {select === "message" && (
        <form className="border p-4 space-y-2 rounded-b-lg">
          <div className="flex items-center gap-2">
            <img
              src={userData?.avatar}
              alt="avatar"
              className="w-[5rem] h-[5rem] rounded-md object-cover"
            />
            <div className="flex flex-col justify-start gap-2">
              <Link className="laptop:text-base text-sm font-semibold hover:text-main-500 cursor-pointer">
                {userData?.first_name} {userData?.last_name}
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  text="Gmail"
                  IcAfter={HiOutlineMailOpen}
                  className="px-4 py-1 rounded-md bg-main-300 text-white hover:bg-main-500"
                />
                <Button
                  text="Phone"
                  IcAfter={FiPhone}
                  className="px-4 py-1 rounded-md bg-main-300 text-white hover:bg-main-500"
                />
              </div>
            </div>
          </div>
          <InputTextArea
            label="Message"
            id="message"
            placeholder="Enter messgae..."
            validate={{ required: "This field can't be empty!" }}
            errors={errors}
            register={register}
          />
          <Button
            className="bg-main-300 text-white hover:bg-main-500 w-full px-3 py-2 rounded-md"
            text="Send message"
            onClick={handleSubmit(onSubmitMessage)}
          />{" "}
        </form>
      )}
      {select === "schedule" && (
        <form className="p-4 space-y-2 border">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker", "MobileDateTimePicker"]}
            >
              <DemoItem label="Schedule Appointment">
                <MobileDateTimePicker
                  value={appointmentDate}
                  onChange={handleAppointmentDate}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker", "MobileDateTimePicker"]}
            >
              <DemoItem label="Backup Appointment Day">
                <MobileDateTimePicker
                  value={backupDate}
                  onChange={handleBackupDate}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Button
            className="text-white bg-main-500 w-full px-3 py-2 rounded-md"
            text="Send Appointment"
            onClick={handleSubmit(onSubmitAppointment)}
          />
        </form>
      )}
    </div>
  );
};

export default DetailSidebar;
