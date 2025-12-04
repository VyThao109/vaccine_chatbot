import { useAppSelector } from "../redux/hook.ts";

const useAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  return { isAuth };
};

export default useAuth;
