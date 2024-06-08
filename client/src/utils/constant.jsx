import { path } from "./path";
import icons from "./icons";
const { RiDashboard2Line, BiCategory, FaRegCircle } = icons;
export const nav = [
  {
    id: 1,
    title: "HOME",
    path: path.HOME,
  },
  {
    id: 2,
    title: "ABOUT US",
    path: path.ABOUT_US,
  },
  {
    id: 3,
    title: "OUR AGENTS",
    path: path.OUR_AGENTS,
  },
  {
    id: 4,
    title: "PROPERTIES",
    path: path.PROPERTIES,
  },
  {
    id: 5,
    title: "GALLERY",
    path: path.PROPERTIES,
  },
  {
    id: 6,
    title: "BLOG",
    path: path.PROPERTIES,
  },
  {
    id: 7,
    title: "CONTACT US",
    path: path.PROPERTIES,
  },
];

export const adminSidebar = [
  {
    id: 1,
    name: "Dashboard",
    path: `/${path.ADMIN}/${path.ADMIN_DASHBOARD}`,
    icon: <RiDashboard2Line />,
    type: "single",
  },
  {
    id: 2,
    name: "Properties Type",
    icon: <BiCategory />,
    type: "parent",
    subs: [
      {
        id: 21,
        path: `/${path.ADMIN}/${path.PROPERTY_TYPE}`,
        name: "Manage Properties Type",
        icon: <FaRegCircle />,
      },
      {
        id: 22,
        path: `/${path.ADMIN}/${path.PROPERTY_TYPE}/${path.CREATE_PROPERTY_TYPE}`,
        name: "Create Properties Type",
        icon: <FaRegCircle />,
      },
    ],
  },
];

export const showOptions = [
  {
    id: 1,
    name: "Personal",
    code: "SU4",
  },
  {
    id: 2,
    name: "Agent",
    code: "GA5",
  },
  {
    id: 4,
    name: "Owner",
    code: "WO5",
  },
  {
    id: 4,
    name: "Admin",
    code: "DA5",
  },
];

export const formatMoney = (number) => {
  if (!+number) return 0;
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
