import { createBrowserRouter, Navigate } from "react-router-dom";
import Logout from "../pages/logout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Scorepanel from "../pages/scorepanel";
import NotFound from "../pages/notfound";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/scorepanel" replace /> },
  {
    path: "/scorepanel",
    element: <Scorepanel />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path:"/notfound",
    element: <NotFound />
  }
]);

export default router;