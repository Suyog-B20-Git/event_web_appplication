import { Axios } from "axios";

import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";
export const deleteFavouriteEvent = (eventId) => {
  console.log("Delete eventId.", eventId);
  const isLogin = JSON.parse(localStorage.getItem("isLogin")); // Convert string back to boolean
  return () => {
    axiosInstance
      .delete(Event.addFavouriteEvent, {
        // eventId: eventId,
        data: { eventId: eventId },
      })
      .then((response) => {
        if (!response.data.status) {
          toast.success(response.data.message, {
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
              type: "DELETE_FAVOURITE_EVENT",
              payload: response.favorites,
            });
          } else {
            toast.error("Login first!!!", {
              transition: Zoom,
              hideProgressBar: true,
              autoClose: 2000,
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
