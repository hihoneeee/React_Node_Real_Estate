import { Outlet } from "react-router-dom";
import { AdminSidebar } from "src/components";
const AdminLayout = () => {
  return (
    <main className="flex">
      <div className="w-[15%] bg-[#222d32] text-white h-full max-h-screen overflow-auto shadow-xl">
        <AdminSidebar />
      </div>
      <div className="w-[85%] p-5 bg-[#ecf0f5] h-screen">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
