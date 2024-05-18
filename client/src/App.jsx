import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./utils/path";
import { Home, Layout, Properties, AboutUs, OurAgents } from "./pages/public";
import {
  DashBoard,
  AdminLayout,
  ManagePropertyType,
  CreatePropertyType,
} from "./pages/admin";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, token } = useUserStore();
  useEffect(() => {
    getCurrent();
  }, [token]);
  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        {/* user layout */}
        <Route path={path.LAYOUT} element={<Layout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.OUR_AGENTS} element={<OurAgents />} />
        </Route>

        {/* Admin router */}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<DashBoard />} />
          <Route path={path.PROPERTY_TYPE} element={<ManagePropertyType />} />
          <Route
            path={`${path.PROPERTY_TYPE}/${path.CREATE_PROPERTY_TYPE}`}
            element={<CreatePropertyType />}
          />
        </Route>
      </Routes>
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
