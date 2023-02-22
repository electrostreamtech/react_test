import React from "react";
const Home = React.lazy(() => import("./components/Dashboard/Table"));
const AddEvent = React.lazy(() => import("./components/Dashboard/Add"));
const EditEvent = React.lazy(() => import("./components/Dashboard/Edit"));

const routes = [
  { path: "/", exact: true, name: "Dashboard", element: Home },
  {
    path: "/event/add",
    exact: true,
    name: "Add event",
    element: AddEvent,
  },

  {
    path: "/event/edit/:id",
    exact: true,
    name: "edit event",
    element: EditEvent,
  },
];

export default routes;
