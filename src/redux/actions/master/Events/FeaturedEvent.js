import { Axios } from "axios";
import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

export const updateLiftType = (data, props, setisLoader) => {
  return (dispatch, getStore) => {
    Axios.put(
      `/api/master/type-of-lift-master/${props.preloadValue.detail._id}`,
      {
        lift_name: data.lift_name.toLowerCase(),
        status: JSON.parse(data.status),
      }
    )
      .then((response) => {
        if (response.data.status === false) {
          toast.error(response.data.message, {
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
          props.onMasterSave();
          // props.history.push({state : {}})
          return (dispatch) => {
            dispatch({
              type: "UPDATE_LIFT_TYPE",
              data,
            });
          };
        }
      })
      .then(() =>
        dispatch(
          getTypeOfLiftList(getStore().typeOfLiftMasterData.params, setisLoader)
        )
      )
      .catch(function (error) {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Something Went Wrong !",
          { transition: Zoom, hideProgressBar: false, autoClose: 2000 }
        );
      });
  };
};

import axios from "axios";
import { Event } from "../../../Urls";

export const getFeaturedEventData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axios.get(Event.featuredEvent);
      console.log("response", response);
      dispatch({
        type: "GET_FEATURED_EVENT",
        eventData: response.data.updatedEvents, // Ensure the API actually returns this structure
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_FEATURED_EVENT",
        eventData: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
