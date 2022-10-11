import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/user/userSlice";
import { toastError } from "../helpers/toastify";

const useErrorHandler = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleError = (error: {
    status?: number;
    data?: { message?: string };
  }) => {
    if (error.status === 401) {
      toastError("Please login to continue");
      dispatch(logout());
      navigate("/auth");
    } else {
      toastError((error?.data?.message as string) || "Something went wrong");
    }
  };

  return { handleError };
};

export default useErrorHandler;
