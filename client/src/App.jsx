import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./utils/path";
import { Home, Layout, Properties, AboutUs, OurAgents } from "./pages/public";
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
        <Route path={path.LAYOUT} element={<Layout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.OUR_AGENTS} element={<OurAgents />} />
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
