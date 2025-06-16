import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Venue } from "../../../Urls";

export const deleteFavouriteVenue = (venueId) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  return (dispatch) => {
    dispatch({ type: "REMOVE_FAVOURITE" });

    axiosInstance
      .delete(Venue.getFavouriteVenue, {
        data: { venueId: venueId },
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
              payload: venueId,
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
