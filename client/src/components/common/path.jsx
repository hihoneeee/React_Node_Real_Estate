/* eslint-disable react/prop-types */
import { memo } from "react";
import { NavLink } from "react-router-dom";
import icons from "src/utils/icons";
import { path } from "src/utils/path";

const { RiDashboard2Line } = icons;

const Path = ({ parent, child, parentUrl }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <RiDashboard2Line className="mr-1" />
        <NavLink
          to={`/${path.ADMIN}/${path.ADMIN_DASHBOARD}`}
          className="text-xs hover:text-main-500"
        >
          <span>Dash Board</span>
        </NavLink>
        <span className="mx-1">&gt;</span>
      </div>
      <div className="flex items-center">
        <NavLink to={parentUrl} className="text-xs hover:text-main-500">
          <span>{parent}</span>
        </NavLink>
        <span className="mx-1">&gt;</span>
      </div>
      <p className="text-xs text-gray-400">{child}</p>
    </div>
  );
};

export default memo(Path);
