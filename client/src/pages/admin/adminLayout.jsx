import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "src/components";
import { useUserStore } from "src/store/useUserStore";
import Swal from "sweetalert2";
const AdminLayout = () => {
  const { current } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!current || current.roleCode !== "D22MD2") {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "You shouldn't be here!",
        showConfirmButton: true,
        confirmButtonText: "Go Homepage!",
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, [current]);
  return (
    <>
      {!current ||
        (current.roleCode === "D22MD2" && (
          <main className="flex">
            <div className="w-[15%] bg-[#222d32] text-white h-full max-h-screen overflow-auto shadow-xl">
              <AdminSidebar />
            </div>
            <div className="w-[85%] p-5 bg-[#ecf0f5] h-screen">
              <Outlet />
            </div>
          </main>
        ))}
    </>
  );
};

export default AdminLayout;
