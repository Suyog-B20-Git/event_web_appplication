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
import { Service } from "../../../Urls";
let api = Service.getFilterService;
export const getService = (setLoader, filter, page, category) => {
  setLoader(true); // Start loading
  switch (filter) {
    case "title asc":
      if (category) {
        api = `${Service.getFilterService}?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=9&sortOrder=asc&sortBy=name`;
      } else
        api = `${Service.getFilterService}?page=${page}&limit=9&sortOrder=asc&sortBy=name`;

      break;

    case "title desc":
      if (category) {
        api = `${Service.getFilterService}?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=9&sortOrder=desc&sortBy=name`;
      } else
        api = `${Service.getFilterService}?page=${page}&limit=9&sortOrder=desc&sortBy=name`;
      break;

    case "alphabetical":
      if (category) {
        api = `${Service.getFilterService}?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=9&sortOrder=asc&sortBy=name`;
      } else
        api = `${Service.getFilterService}?page=${page}&limit=9&sortOrder=asc&sortBy=name`;
      break;

    default:
      if (category) {
        api = ` ${Service.getFilterService}?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=9`;
      } else api = ` ${Service.getFilterService}?page=${page}&limit=9`;
      break;
  }

  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axios.get(`${api}`);
      console.log("response", response);
      dispatch({
        type: "GET_SERVICE",
        serviceData: response.data.services, // Ensure the API actually returns this structure
        totalPages:response.data.totalPages
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_SERVICE",
        serviceData: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
