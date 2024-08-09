import App from "src/App";
import { path } from "./path";
import {
  AboutUs,
  AddProperty,
  DetailProperty,
  Home,
  Layout,
  OurAgents,
  Properties,
} from "src/pages/public";
import {
  AdminLayout,
  CreateCategory,
  DashBoard,
  ManageCategory,
} from "src/pages/admin";
import { Message, Personal, Profile } from "src/pages/user";
import { ConfirmChangeEmail, NotFoud404 } from "src/components";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: path.LAYOUT,
        element: <Layout />,
        children: [
          {
            path: path.HOME,
            element: <Home />,
          },
          {
            path: path.ABOUT_US,
            element: <AboutUs />,
          },
          {
            path: path.PROPERTIES,
            element: <Properties />,
          },
          {
            path: path.DETAIL_PROPERTY,
            element: <DetailProperty />,
          },
          {
            path: path.ADD_PROPERTY,
            element: <AddProperty />,
          },
          {
            path: path.OUR_AGENTS,
            element: <OurAgents />,
          },
          {
            path: path.PERSONAL,
            element: <Personal />,
            children: [
              {
                path: path.PROFILE,
                element: <Profile />,
              },
              {
                path: path.MESSAGE,
                element: <Message />,
              },
            ],
          },
          {
            path: path.CONFIRM_CHANGE_EMAIL,
            element: <ConfirmChangeEmail />,
          },
        ],
      },
      {
        path: path.ADMIN,
        element: <AdminLayout />,
        children: [
          {
            path: path.ADMIN_DASHBOARD,
            element: <DashBoard />,
          },
          {
            path: path.CATEGORY,
            element: <ManageCategory />,
          },
          {
            path: `${path.CATEGORY}/${path.CREATE_CATEGORY}`,
            element: <CreateCategory />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoud404 />,
      },
    ],
  },
];

export default routes;
