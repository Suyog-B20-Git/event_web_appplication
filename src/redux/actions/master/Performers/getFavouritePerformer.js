import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

import {  Performer } from "../../../Urls";

export const getFavouritePerformerData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axiosInstance.get(
        `${Performer.getFavouritePerformer}`
      );
      dispatch({
        type: "GET_FAVOURITE_PERFORMER",
        payload: response.data.organizers, 
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
