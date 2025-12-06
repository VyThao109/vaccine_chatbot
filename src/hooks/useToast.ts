import { useAppDispatch } from "../redux/hook";
import { addToast, type ToastType } from "../redux/features/toast/toast.slice";

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (message: string, type: ToastType = "info", duration = 3000) => {
    dispatch(addToast({ message, type, duration }));
  };

  return { showToast };
};