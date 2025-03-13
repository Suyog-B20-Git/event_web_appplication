import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

import { Event, Performer } from "../../../Urls";

export const getFavouritePerformerData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axiosInstance.get(
        `${Performer.postFavouritePerformer}`
      );
      // console.log("fav response", response);
      dispatch({
        type: "GET_FAVOURITE_PERFORMER",
        payload: response.data.organizers, // Ensure the API actually returns this structure
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_FAVOURITE_PERFORMER",
        payload: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
