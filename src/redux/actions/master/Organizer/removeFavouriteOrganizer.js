import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";
import { Organizer } from "../../../Urls";


export const removeFavouriteOrganizer = (organizerId) => async (dispatch) => {
  dispatch({ type: "REMOVE_FAVOURITE" });
  try {
    await axiosInstance.delete(`${Organizer.removeFavouriteOrganizer}/${organizerId}`);
    dispatch({ type: "REMOVE_FAVOURITE_SUCCESS", payload: organizerId });
  } catch (error) {
    dispatch({ type: "REMOVE_FAVOURITE_FAILURE", payload: error.message });
  }
};

