
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../utility/utils";

export const changePassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "CHANGE_PASSWORD_REQUEST" });

    const response = await axiosInstance.post("/api/auth/changePassword", formData);
    toast.success("Password changed successfully!", { autoClose: 2000 });

    dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: response.data });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error changing password";

    toast.error(errorMessage, { autoClose: 2000 });

    dispatch({
      type: "CHANGE_PASSWORD_FAILURE",
      payload: errorMessage,
    });
  }
};
