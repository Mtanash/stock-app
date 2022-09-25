import { RTKQError } from "./../interfaces/index";
import { toastError } from "./toastify";

export const errorHandler = (error: RTKQError) => {
  if (error.status === 401) {
    toastError("Please login to add stock");
  } else {
    toastError(error.data.message as string);
  }
};
