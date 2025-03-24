import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Sign from "./components/register/Sign";
import MediSettings from "./components/notifications/MediSettings";
import Home from "./components/Home"; // Import Dashboard
import RootLayout from './RootLayout';
import NotificationBell from "./components/notifications/NotificationBell";

const App = () => {
  const browserRouter=createBrowserRouter(
    [
      {
        path:'/',
        element :<RootLayout />,
        children :[
          {
            path:'/',
            element:<Home />,
          },{
            path:'/login',
            element:<Login />,
          },{
             path :'/auth',
             element:<Sign />
          },
            {
            path:'/register',
            element:<Register />,
          },
          {
            path:'/mediNotify',
            element:<MediSettings />,
          },
       
         
        ],
      },
    ]
  );
  return (
       <div className="main">
        <RouterProvider router={browserRouter}></RouterProvider>
       </div>
      );
};

export default App;
