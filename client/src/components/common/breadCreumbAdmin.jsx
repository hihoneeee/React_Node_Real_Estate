/* eslint-disable react/prop-types */
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const breadCrumbRoutes = [
  {
    path: "admin",
    breadcrumb: "Dashborad",
  },
];
const BreadCreumbAdmin = ({ style }) => {
  const breadcrumbs = useBreadcrumbs(breadCrumbRoutes);
  return (
    <div className={twMerge(clsx("flex items-center ", style))}>
      <React.Fragment>
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
          <NavLink key={match.pathname} to={match.pathname}>
            <span className="hover:underline lg:text-xs text-xxs">
              {breadcrumb}
            </span>
            {index < breadcrumbs.length - 1 && <span> &gt; </span>}
          </NavLink>
        ))}
      </React.Fragment>
    </div>
  );
};

export default BreadCreumbAdmin;
