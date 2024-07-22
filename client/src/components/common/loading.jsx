import { memo } from "react";
import { Blocks } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default memo(Loading);
