/* eslint-disable react/prop-types */
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Header, Navigation } from "src/components";
import withRouter from "src/hocs/withRouter";

const Layout = ({ location }) => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className={clsx(location.pathname === "/" ? "" : "")}>
        <Outlet />
      </div>
    </div>
  );
};

export default withRouter(Layout);
