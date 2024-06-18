/* eslint-disable react/prop-types */
import usePagination from "src/hooks/usePagination";
import { PaginationItem } from "../../components";
import icons from "src/utils/icons";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "src/hocs/withRouter";

const { FaArrowRight, FaArrowLeft } = icons;

const Pagination = ({ total, limit, page, sibling, navigate, location }) => {
  const paginations = usePagination({
    total,
    limit,
    currentPage: page,
    sibling,
  });
  const [searchParams] = useSearchParams();

  const handleNextPage = () => {
    if (+page < Math.ceil(+total / +limit)) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ page: +page + 1 }).toString(),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackPage = () => {
    if (+page > 1) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ page: +page - 1 }).toString(),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 transition-all">
      <div
        className={twMerge(
          clsx(
            "w-[2.5rem] h-[2.5rem] rounded-md bg-main-50 text-main-500 flex items-center justify-center hover:bg-main-500 hover:text-white cursor-pointer",
            (!page || +page === 1) &&
              "select-none opacity-50 cursor-not-allowed"
          )
        )}
        onClick={handleBackPage}
      >
        <FaArrowLeft />
      </div>
      {paginations?.length > 0 &&
        paginations.map((el, idx) => (
          <PaginationItem
            page={searchParams.get("page")}
            content={el}
            key={idx}
            navigate={navigate}
            location={location}
          />
        ))}
      <div
        className={twMerge(
          clsx(
            "w-[2.5rem] h-[2.5rem] rounded-md bg-main-50 text-main-500 flex items-center justify-center hover:bg-main-500 hover:text-white cursor-pointer",
            (!page || +page === Math.ceil(+total / +limit)) &&
              "select-none opacity-50 cursor-not-allowed"
          )
        )}
        onClick={handleNextPage}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default withRouter(Pagination);
