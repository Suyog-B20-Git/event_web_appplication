import axios from "axios";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Auth } from "../../Urls";
import { axiosInstance } from "../../../../utility/utils";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_REQUEST" });
    const response = await axiosInstance.get("/user");

    if (response.data.status) {
      dispatch({
        type: "GET_USER_SUCCESS",
        payload: response.data.data,
      });
    } else {
      throw new Error(response.data.message || "Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Get User Profile Error:", error.response || error);

    const errorMessage =
      error.response?.data?.message || "Failed to fetch user profile";

    dispatch({
      type: "GET_USER_FAILURE",
      payload: errorMessage,
    });
  }
};

export const updateUserProfile = (formData, token) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });
    const response = await axiosInstance.put("/api/auth/update", formData);



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
