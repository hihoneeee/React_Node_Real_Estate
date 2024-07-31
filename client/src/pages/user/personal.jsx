import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Login, PersonalSidebar } from "src/components";
import { UserProvider } from "src/hooks/useContextApi";
import { useAppStore } from "src/store/useAppStore";
import { useUserStore } from "src/store/useUserStore";
import Swal from "sweetalert2";

const Personal = () => {
  const { current } = useUserStore();
  const { setModal, isShowModal } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!current) {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "Login require!",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Go Homepage",
        confirmButtonText: "Go Login",
      }).then((response) => {
        if (response.isConfirmed) {
          setModal(true, <Login />);
          if (!isShowModal) {
            navigate("/");
          }
        }
        if (response.isDismissed) {
          navigate("/");
        }
      });
    }
  }, [current]);
  return (
    <UserProvider current={current}>
      {current && (
        <div className="desktop:px-[20rem] laptop:px-[14rem] tablet:px-[8rem] px-[2rem] py-8 space-y-8">
          <div className="border-2 shadow-xl flex rounded-lg">
            <div className="w-[8%]">
              <PersonalSidebar current={current} />
            </div>
            <div className="w-[92%] ">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </UserProvider>
  );
};

export default Personal;
