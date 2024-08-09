/* eslint-disable react/prop-types */
import clsx from "clsx";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const breadCrumbRoutes = [
  {
    path: "/",
    breadcrumb: "Home",
  },
  {
    path: "/properties",
    breadcrumb: "Properties",
  },
];

const BreadCreumbPublic = ({ style }) => {
  const breadcrumbs = useBreadcrumbs(breadCrumbRoutes);
  const location = useLocation();

  return (
    <div className={twMerge(clsx("lg:text-sm text-xs text-gray-300", style))}>
      <React.Fragment>
        {breadcrumbs.map(({ match, breadcrumb }, index) => {
          const isActive = match.pathname === location.pathname;
          return (
            <NavLink key={match.pathname} to={match.pathname}>
              <span
                className={clsx({
                  "font-semibold": isActive,
                  "hover:underline": !isActive,
                })}
              >
                {breadcrumb}
              </span>
              {index < breadcrumbs.length - 1 && " > "}
            </NavLink>
          );
        })}
      </React.Fragment>
    </div>
  );
};

export default BreadCreumbPublic;
