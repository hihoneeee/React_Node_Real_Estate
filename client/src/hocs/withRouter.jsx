/* eslint-disable react/display-name */
import { useLocation, useNavigate } from "react-router-dom";
const withRouter = (Component) => (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return <Component navigate={navigate} location={location} {...props} />;
};

export default withRouter;
