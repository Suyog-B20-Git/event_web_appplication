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

export const getEventByFilter = (
  setLoader,
  filterValue,
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
  let api = `${Event.getEventByFilter}?page=${pageNo}&limit=9`;

  const filters = {
    category: filterValue,
    category: category,
    price: priceType,
    name: searchEvent,
    country: countryFilter,
    city: cityFilter,
    state: stateFilter,
    startDate,
    endDate,
  };

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      params.append(key, value);
    }
  });

  return async (dispatch) => {
    setLoader(true);

    try {
      const queryString = params.toString(); // Convert filters to query string
      const response = await axios.get(`${api}&${queryString}`);
            
      dispatch({
        type: "GET_EVENT_BY_FILTER",
        filterEventData: response.data?.data.events || [],
        totalPages: response.data.totalPages || 1,
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
      setLoader(false);
    }
  };
};
