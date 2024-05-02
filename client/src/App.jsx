import { Route, Routes } from "react-router-dom";
import { path } from "./utils/path";
import { Home, Layout, Properties, AboutUs, OurAgents } from "./pages/public";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";

const App = () => {
  const { isShowModal } = useAppStore();
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
    </>
  );
};

export default App;
