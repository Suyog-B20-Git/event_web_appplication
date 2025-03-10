import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";




import { Event } from "../../../Urls";
import { Organizer } from "../../../Urls";
export const getFavouriteOrganizerData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axiosInstance.get(`${Organizer.getOrganizerFilter}favorites?page=1&limit=20`);
      // console.log("fav response", response);
      dispatch({
        type: "GET_FAVOURITE_ORGANIZER",
        payload: response.data.organizers, // Ensure the API actually returns this structure
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_FAVOURITE_ORGANIZER",
        payload: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
