import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";

export const createNewEvent = (data) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const authToken = localStorage.getItem("authToken");

  return async (dispatch) => {
    try {
      // const response = await axiosInstance.post(Event.createEvent, {
      //   data,
      // });
      const response = await axiosInstance.post(Event.createEvent, data,
        // {

        //       headers: {
        //         Authorization: `Bearer ${authToken}`,
        //         "Content-Type": "application/json",
        //       },  
        //     }
      );
      if (!response.data.status) {
        toast.error(response.data.message || "Event creation failed", {
          transition: Zoom,
          hideProgressBar: true,
          autoClose: 2000,
        });
        throw new Error(response.data.message);
      }

      toast.success(response.data.message || "Event created successfully", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });

      if (isLogin) {
        dispatch({ type: "CREATE_EVENT", event: response.data });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(errorMessage, {
        transition: Zoom,
        hideProgressBar: false,
        autoClose: 2000,
      });
      throw error;
    }
  };
};
