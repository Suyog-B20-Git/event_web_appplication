import { Axios } from "axios";

import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";
export const addFavouriteEvent = (eventId) => {
  console.log("data.:::", eventId);
  const isLogin = JSON.parse(localStorage.getItem("isLogin")); // Convert string back to boolean
  return () => {
    axiosInstance
      .post(Event.addFavouriteEvent, {
        eventId: eventId,
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
              type: "ADD_FAVOURITE_EVENT",
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
