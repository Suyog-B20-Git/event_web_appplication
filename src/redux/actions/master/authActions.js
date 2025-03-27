// import axios from "axios";
// import { toast } from "react-toastify";
// import { axiosInstance } from "../../../../utility/utils";

// export const changePassword = (formData) => async (dispatch) => {
//     try {
//       dispatch({ type: "CHANGE_PASSWORD_REQUEST" });
  
//       const response = await axiosInstance.post("/api/auth/changePassword", formData);
   
//       dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: response.data });
//     } catch (error) {
//       dispatch({
//         type: "CHANGE_PASSWORD_FAILURE",
//         payload: error.response?.data?.message || "Error changing password",
//       });
//     }
//   };



import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../utility/utils";

export const changePassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "CHANGE_PASSWORD_REQUEST" });

    const response = await axiosInstance.post("/api/auth/changePassword", formData);

    // Show a success toast message after a successful password change
    toast.success("Password changed successfully!", { autoClose: 2000 });

    dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: response.data });
  } catch (error) {
    // Show an error toast message if the password change fails
    const errorMessage =
      error.response?.data?.message || "Error changing password";

    toast.error(errorMessage, { autoClose: 2000 });

    dispatch({
      type: "CHANGE_PASSWORD_FAILURE",
      payload: errorMessage,
    });
  }
};
