import { Axios } from "axios";
import { Zoom, Slide } from "react-toastify";

import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Venue } from "../../../Urls";
export const createNewVenue = (data) => {
  console.log("data.:::", data);
  const isLogin = JSON.parse(localStorage.getItem("isLogin")); // Convert string back to boolean
  return () => {
    axiosInstance
      .post(`${Venue.postVenue}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (!response.data.status) {
          toast.error(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
        } else {
          toast.success(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
          if (isLogin) {
            dispatch({
              type: "CREATE_VENUE",
              payload: response.data,
            });
          }
          console.log(response);
        }
      })

      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Something went wrong!",
          { transition: Zoom, hideProgressBar: false, autoClose: 2000 }
        );
      });
  };
};
