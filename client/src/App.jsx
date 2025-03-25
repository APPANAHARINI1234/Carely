import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./RootLayout";
import Home from "./components/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Sign from "./components/register/Sign";
import MediSettings from "./components/notifications/MediSettings";
import NotificationBell from "./components/notifications/NotificationBell";
import EditProfile from "./components/EditProfile";
import AddNotification from "./components/AddNotification";
import Notifications from "./components/Notifications";
import Explore from "./components/Explore";
import MediBot from "./components/MediBot";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/auth", element: <Sign /> },
      { path: "/register", element: <Register /> },
      { path: "/mediNotify", element: <MediSettings /> },
      { path: "/edit-profile", element: <EditProfile /> },
      { path: "/add-notification", element: <AddNotification /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/explore", element: <Explore /> },
      { path: "/medibot", element: <MediBot /> },
    ],
  },
]);

const App = () => {
  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
