/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button } from "src/components";
import { toast } from "react-toastify";

const VerifyOTP = ({ cb, setIsShowOTP }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const maxFailedAttempts = 5;

  const handleConfirm = () => {
    setIsLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        cb();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setFailedAttempts((prevAttempts) => {
          const newAttempts = prevAttempts + 1;
          if (newAttempts >= maxFailedAttempts) {
            setIsOtpVisible(false);
            setIsShowOTP(false);
            toast.error(
              "You have entered the wrong OTP too many times. Please request a new OTP."
            );
          } else {
            toast.error(
              `Incorrect OTP. You have ${
                maxFailedAttempts - newAttempts
              } attempts left.`
            );
          }
          return newAttempts;
        });
      });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsOtpVisible(false);
      setIsShowOTP(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setIsShowOTP]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div
      className="p-4 flex items-center justify-center flex-col h-full gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      {isOtpVisible ? (
        <>
          <p className="lg:text-xs text-xxs font-medium">
            We have sent the OTP code to your phone number. Please enter it
            below. The input will close after 5 minutes.
          </p>
          <p className="lg:text-xs text-xxs font-medium">
            Time remaining:{" "}
            <span className="text-red-500 font-bold">
              {formatTime(timeLeft)}
            </span>
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>•</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle="otp-item h-16 border rounded-md outline-none m-4"
            shouldAutoFocus={true}
          />
          <Button
            text="Confirm OTP"
            disabled={isLoading}
            className="bg-main-500 p-2 rounded-md text-white"
            onClick={handleConfirm}
          />
        </>
      ) : (
        <p className="lg:text-xs text-xxs font-medium">
          The OTP input has been closed. Please request a new OTP.
        </p>
      )}
    </div>
  );
};

export default VerifyOTP;
