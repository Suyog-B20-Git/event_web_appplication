import axios from "axios";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Auth } from "../../Urls";
import { axiosInstance } from "../../../../utility/utils";

export const updateUserProfile = (formData, token) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });

    console.log("Sending FormData:", formData);
    console.log("Sending Token:", token);

    const response = await axiosInstance.put("/api/auth/update", formData);
    
    
    console.log("Profile update response:", response);

    if (response.data.status) {
      toast.success("Profile updated successfully!", { autoClose: 2000 });

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: response.data.user,
      });
    } else {
      throw new Error(response.data.message || "Update failed");
    }
  } catch (error) {
    console.error("Profile Update Error:", error.response || error);
  
    const errorMessage =
      error.response?.data?.message || "Something went wrong!";
  
    toast.error(errorMessage, { autoClose: 2000 });
  
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: errorMessage,
    });
  }
  
};
