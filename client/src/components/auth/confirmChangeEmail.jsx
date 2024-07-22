import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLoading from "src/hooks/useLoading";
import Loading from "../common/loading";
import { apiChangeEmailConfirm } from "src/apis/user";
import { toast } from "react-toastify";
import withRouter from "src/hocs/withRouter";

const ConfirmChangeEmail = ({ navigate }) => {
  const { token } = useParams();
  const { loading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const confirmEmailChange = async () => {
      showLoading();
      const response = await apiChangeEmailConfirm(token);
      if (response.success) {
        hideLoading();
        toast.success(response.message);
        navigate("/");
      } else {
        hideLoading();
        toast.error(response.message);
      }
    };
    confirmEmailChange();
  }, [token, showLoading, hideLoading]);

  return (
    <div className="flex items-center justify-center">
      <h2>Confirming your email change...</h2>
      {loading && <Loading />}
    </div>
  );
};

export default withRouter(ConfirmChangeEmail);
