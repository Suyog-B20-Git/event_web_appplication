import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

import { Venue } from "../../../Urls";


export const getFavouriteVenueData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axiosInstance.get(
        `${Venue.getFavouriteVenue}`
      );
      // console.log("fav response", response);
      dispatch({
        type: "GET_FAVOURITE_VENUE",
        payload: response.data.organizers, // Ensure the API actually returns this structure
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_FAVOURITE_VENUE",
        payload: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
