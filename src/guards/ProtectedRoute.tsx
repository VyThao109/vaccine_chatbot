import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../routes/paths";

const ProtectedRoute: React.FC = () => {
  const storedEmail = localStorage.getItem("email");

  const isAuth = Boolean(storedEmail);

  if (!isAuth) {
    return <Navigate to={paths.signin} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
