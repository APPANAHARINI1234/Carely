import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./RootLayout";
import Home from "./components/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Sign from "./components/register/Sign";
import MediSettings from "./components/notifications/MediSettings";
import Explore from "./components/Explore";
import MediBot from "./components/MediBot";
import DiseaseDetail from "./components/DiseaseDetail";


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/auth", element: <Sign /> },
      { path: "/register", element: <Register /> },
      { path: "/mediNotify", element: <MediSettings /> },
      { path: "/explore", element: <Explore /> },
      { path: "/medibot", element: <MediBot /> },
      { path: "/disease/:id", element: <DiseaseDetail /> },
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
