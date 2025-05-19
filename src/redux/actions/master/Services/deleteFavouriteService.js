import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Service } from "../../../Urls";

export const deleteFavouriteService = (serviceId) => {
  console.log("Removing Service from favourites:", serviceId);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  return (dispatch) => {
    dispatch({ type: "REMOVE_FAVOURITE" });

    axiosInstance
      .delete(Service.getFavouriteService, {
        data: { serviceId: serviceId },
      })
      .then((response) => {
        const resData = response.data;

        if (!resData.status) {
          toast.error(resData.message || "Something went wrong!", {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
          });
        } else {
          toast.success(resData.message || "Removed from favourites.", {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
          });

          if (isLogin) {
            dispatch({
              type: "REMOVE_FAVOURITE_SUCCESS",
              payload: serviceId,
            });
          } else {
            toast.error("Login first!!!", {
              transition: Zoom,
              hideProgressBar: false,
              autoClose: 2000,

            });
          }
        }
      })
      .catch((error) => {
        console.error("Error removing from favourites:", error);
        toast.error(
          error.response?.data?.message || "Something went wrong!",
          {
            transition: Zoom,
            hideProgressBar: false,
            autoClose: 2000,
          }
        );

        dispatch({
          type: "REMOVE_FAVOURITE_FAILURE",
          payload: error.message,
        });
      });
  };
};
