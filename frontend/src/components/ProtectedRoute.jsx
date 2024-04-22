import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx"; // Adjust the import path as needed

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useStateContext();
  const userRole = localStorage.getItem("userRole");

  if (!user || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />; // Rediriger vers /login si non autorisé
  }

  if (userRole !== "admin" && window.location.pathname === "/userAdmin") {
    return <Navigate to="/user" replace />; // Rediriger les non-admins vers /user
  }

  return children;
};

export default ProtectedRoute;
