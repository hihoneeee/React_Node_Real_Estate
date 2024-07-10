/* eslint-disable react/prop-types */
import clsx from "clsx";
import { createSearchParams, useSearchParams } from "react-router-dom";
import withRouter from "src/hocs/withRouter";
import { twMerge } from "tailwind-merge";

const PaginationItem = ({ content, page, navigate, location }) => {
  const [searchParams] = useSearchParams();
  const handleChangPage = () => {
    const params = Object.fromEntries([...searchParams]);
    params.page = content;
    if (params.price) params.price = searchParams.getAll("price");
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!Number(content))
    return (
      <div className="w-[2.5rem] h-[2.5rem] rounded-md bg-main-50 text-main-500 flex items-center justify-center">
        ...
      </div>
    );
  return (
    <button
      type="button"
      onClick={handleChangPage}
      className={twMerge(
        clsx(
          "w-[2.5rem] h-[2.5rem] rounded-md bg-main-50 text-main-500 flex items-center justify-center font-bold hover:bg-main-500 hover:text-white cursor-pointer",
          !page && +content == 1 && "bg-main-500 text-white",
          page == content && "bg-main-500 text-white"
        )
      )}
    >
      {content}
    </button>
  );
};

export default withRouter(PaginationItem);
