import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

import { Service} from "../../../Urls";

export const getFavouriteServiceData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axiosInstance.get(
        `${Service.getFavouriteService}`
      );
      // console.log("fav response", response);
      dispatch({
        type: "GET_FAVOURITE_SERVICE",
        payload: response.data.organizers, // Ensure the API actually returns this structure
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_FAVOURITE_SERVICE",
        payload: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
