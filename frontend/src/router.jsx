import { createBrowserRouter, useNavigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import User from "./views/User";
import Home from "./views/Home.jsx";
import GoogleCallback from "./components/GoogleCallback.jsx";
import { Navigate } from "react-router-dom";
import ResetPassword from "./views/ResetPassword.jsx";
import NewPassword from "./views/NewPassword.jsx";
import Projects from "./components/Projects.jsx";
import UserAdmin from "./views/UserAdmin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import FormAccessSignUp from "./components/FormAccessSignUp.jsx";
import Dashboardd1 from "./views/Dashboardd1.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import Profile from "./components/Profile.jsx";
import Messanger from "./Pages/Chat/Messanger.jsx";
import Progress from "./views/Progress/Progress.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/progress",
        element: <Progress />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/chat",
        element: <Messanger />,
        children: [
          {
            path: ":id",
            element: <Messanger />,
          },
        ],
      },
      {
        path: "/projects",
        element: (
          <ProtectedRoute allowedRoles={["chef", "user", "member", "admin"]}>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "/project/:projectId",
        element: (
          <ProtectedRoute allowedRoles={["chef", "user", "member", "admin"]}>
            <ProjectDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/userAdmin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserAdmin />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/passwordreset",
        element: <ResetPassword />,
      },
      {
        path: "/newpassword",
        element: <NewPassword />,
      },
      {
        path: "/formAccess",
        element: <FormAccessSignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "dash",
    element: <Dashboardd1 />,
  },
]);

export default router;
