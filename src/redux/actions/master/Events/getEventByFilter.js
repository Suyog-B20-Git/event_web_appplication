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

// export const getEventByFilter = (setLoader, filter) => {
export const getEventByFilter = (
  setLoader,
  category,
  priceType,
  searchEvent,
  countryFilter,
  cityFilter,
  stateFilter,
  startDate,
  endDate,
  pageNo
) => {
  let api = `${Event.getAllEvents}/filter?page=${pageNo}&limit=9`;
  setLoader(true); // Start loading

  // if (filter && filter != "all") {
  //   api = `${Event.getEventByFilter}category=${encodeURIComponent(
  //     filter
  //   )}&page=1&limit=10`;
  // } else if (filter == "all") {
  //   api = Event.getAllEvents;
  // } else {
  //   api = Event.getAllEvents;
  // }
  const filters = {
    category: category,
    price: priceType,
    searchEvent: searchEvent,
    country: countryFilter,
    city: cityFilter,
    state: stateFilter,
    startDate: startDate,
    endDate: endDate,
  };
  const hasFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== null && value !== ""
  );

  if (hasFilters) {
    api = `${Event.getEventByFilter}page=${pageNo}&limit=9`;
  } else {
    api = `${Event.getAllEvents}/filter?page=${pageNo}&limit=9`;
  }

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
    ) {
      params.append(key, value);
    }
  });

  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      // const response = await axios.get(`${api}${params.toString()}`);
      const response = await axios.get(
        `${api}${
          hasFilters ? `${params.toString().replace(/\+/g, "%20")}` : ""
        }`
      );
      console.log("response", response);
      dispatch({
        type: "GET_EVENT_BY_FILTER",
        filterEventData: response.data.events, // Ensure the API actually returns this structure
        // pageNo: page,
        totalPages:response.data.totalPages
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_EVENT_BY_FILTER",
        filterEventData: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
