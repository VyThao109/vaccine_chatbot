import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layouts/MainLayout";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import ProtectedRoute from "../guards/ProtectedRoute";
import ChatPage from "../pages/chat/ChatPage";
import ForbiddenPage from "../pages/auth/ForbiddenPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={paths.root} element={<MainLayout />}>
          <Route index element={<Navigate to={paths.chat} replace />} />
          <Route path={paths.chat} element={<ChatPage />} />
        </Route>
      </Route>
      <Route path={paths.signin} element={<SignInPage />} />
      <Route path={paths.signup} element={<SignUpPage />} />
      <Route path={paths.forbidden} element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default AppRoutes;
