import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../routes/paths";
import useAuth from "../hooks/useAuth";

const ProtectedRoute: React.FC = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={paths.signin} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
