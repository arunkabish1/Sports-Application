import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
const Logout = React.lazy(() => import("../pages/logout"));
const Scorepanel = React.lazy(() => import("../pages/scorepanel"));
const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const NotFound = React.lazy(() => import("../pages/notfound"));
const ChangePasswordForm = React.lazy(
  () => import("../pages/changepass/passwordchange")
);

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
    path: "/notfound",
    element: <NotFound />,
  },
  {
    path: "/passwordchange",
    element: (
      <ProtectedRoute>
        <ChangePasswordForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />,
  },
]);

export default router;
