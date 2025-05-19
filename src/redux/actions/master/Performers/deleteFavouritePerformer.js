import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Performer } from "../../../Urls";

export const deleteFavouritePerformer = (performerId) => {
  console.log("Removing performer from favourites:", performerId);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  return (dispatch) => {
    dispatch({ type: "REMOVE_FAVOURITE" });

    axiosInstance
      .delete(Performer.deleteFavouritePerformer, {
        data: { performerId: performerId },
      })
      .then((response) => {
        const resData = response.data;
        console.log("resData", resData);

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
              payload: performerId,
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
