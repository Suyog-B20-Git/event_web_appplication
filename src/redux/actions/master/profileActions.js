import axios from "axios";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" }); 

    const response = await axios.put("/api/auth/update", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    console.log("Profile update response:", response);

    if (response.data.status) {
      toast.success("Profile updated successfully!", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: response.data.user, 
      });
    } else {
      throw new Error(response.data.message || "Update failed");
    }
  } catch (error) {
    console.error(
      "Profile Update Error:",
      error.response ? error.response.data : error.message
    );

    toast.error(error.response?.data?.message || "Something went wrong!", {
      transition: Zoom,
      hideProgressBar: false,
      autoClose: 2000,
    });

    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
