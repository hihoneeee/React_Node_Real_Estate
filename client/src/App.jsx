import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "src/utils/path";
import { Home, Layout, Properties, AboutUs, OurAgents } from "src/pages/public";
import {
  DashBoard,
  AdminLayout,
  ManagePropertyType,
  CreatePropertyType,
} from "./pages/admin";
import { Modal } from "src/components";
import { useAppStore } from "src/store/useAppStore";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "src/store/useUserStore";
import { usePropertyTypeStore } from "./store/usePropertyTypeStore";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, token } = useUserStore();
  const { getPropertyType } = usePropertyTypeStore();
  useEffect(() => {
    getCurrent();
    getPropertyType({ sort: "title", fields: "id,title,image" });
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
