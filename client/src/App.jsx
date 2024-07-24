import { useEffect } from "react";
import { Modal } from "src/components";
import { useAppStore } from "src/store/useAppStore";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useUserStore,
  useCategoryStore,
  useNotificationStore,
} from "src/store/";
import { Outlet } from "react-router-dom";
import { startSignalRConnection } from "src/signalR";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, token } = useUserStore();
  const { getCategories } = useCategoryStore();
  const { getNotification } = useNotificationStore();

  useEffect(() => {
    getCurrent();
    getCategories();
    getNotification();
  }, [token]);

  useEffect(() => {
    startSignalRConnection(token);
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
