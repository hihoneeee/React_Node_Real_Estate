import { useEffect } from "react";
import { Modal } from "src/components";
import { useAppStore } from "src/store/useAppStore";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "src/store/useUserStore";
import { useCategoryStore } from "./store/useCategoryStore";
import { Outlet } from "react-router-dom";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, token } = useUserStore();
  const { getCategories } = useCategoryStore();
  useEffect(() => {
    getCurrent();
    getCategories();
  }, [token]);

  return (
    <>
      {isShowModal && <Modal />}
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </>
  );
};

export default App;
