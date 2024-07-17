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
        console.log(response);
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
        <div className="px-48 py-8 space-y-8">
          <div className="border-2 shadow-xl flex gap-2 rounded-lg">
            <div className="w-[20%]">
              <PersonalSidebar current={current} />
            </div>
            <div className="w-[80%]">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </UserProvider>
  );
};

export default Personal;
