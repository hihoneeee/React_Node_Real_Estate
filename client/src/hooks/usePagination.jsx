import { useMemo } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { renderRangeNumber } from "src/utils/constant";

const usePagination = ({
  total = 0,
  currentPage = 1,
  limit = 1,
  sibling = 0,
}) => {
  const paginationArr = useMemo(() => {
    const pageSize = +limit;
    const pageNumber = Math.ceil(total / pageSize);
    const totalPaginationItem = 5 + sibling;

    if (pageNumber <= totalPaginationItem) {
      return renderRangeNumber(1, pageNumber);
    }
    const isShowInLeft = currentPage - sibling > 3;
    const isShowInRight = currentPage + sibling < pageNumber - 2;

    if (isShowInLeft && !isShowInRight) {
      const rightStart = pageNumber - 2;
      const rightArr = renderRangeNumber(rightStart, pageNumber);
      return [1, <BiDotsHorizontalRounded />, ...rightArr];
    }
  }, [total, currentPage, limit, sibling]);

  return paginationArr;
};

export default usePagination;
