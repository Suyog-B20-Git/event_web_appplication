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
// const PORT = import.meta.env.VITE_API_PORT;]
import { Event } from "../../../Urls";
export const getUpcomingEventData = (setLoader) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axios.get(Event.upcomingEvent);
      console.log("response", response);
      dispatch({
        type: "GET_UPCOMING_EVENT",
        eventData: response.data.events, // Ensure the API actually returns this structure
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_UPCOMING_EVENT",
        eventData: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};

export const getUpcomingEventsDataForProfile = ({
                                    page = 1,
                                    limit = 10,
                                    timezoneOffset = 0,
                                    sortBy = "startDate",
                                    sortOrder = "asc",
                                    performer,
                                    organizer,
                                    venue,
                                    setLoader, // A function to control loader visibility
                                  }) => {
  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      // Build query parameters based on the input values
      const params = {
        page,
        limit,
        timezoneOffset,
        sortBy,
        sortOrder,
      };

      // Include filters if provided
      if (performer) params.performer = performer;
      if (organizer) params.organizer = organizer;
      if (venue) params.venue = venue;

      // Make the API request using the provided query parameters
      const response = await axios.get(Event.upcomingEvent, { params });
      console.log("Upcoming events response", response.data);

      // Dispatch the fetched data; you can adjust the payload structure if needed
      dispatch({
        type: "GET_UPCOMING_EVENT",
        eventData: response.data.events, // expecting an object with total, page, limit, totalPages, events
      });
    } catch (error) {
      console.error(
          "API Error:",
          error.response ? error.response.data : error.message
      );
      // Dispatch an empty payload or an error-specific payload as required
      dispatch({
        type: "GET_UPCOMING_EVENT",
        eventData:[],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};