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

import { Performer } from "../../../Urls";
let api = Performer.getPerformerByFilter;
export const getPerformer = (setLoader, filter, page, category) => {
  switch (filter) {
    case "title asc":
      if (category) {
        api = `${
          Performer.getPerformerByFilter
        }?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=8&sortOrder=asc`;
      } else
        api = `${Performer.getPerformerByFilter}?page=${page}&limit=8&sortOrder=asc`;
      break;

    case "title desc":
      if (category) {
        api = `${
          Performer.getPerformerByFilter
        }?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=8&sortOrder=desc`;
      } else
        api = `${Performer.getPerformerByFilter}?page=${page}&limit=8&sortOrder=desc`;
      break;

    case "alphabetical":
      if (category) {
        api = `${
          Performer.getPerformerByFilter
        }?categories=${encodeURIComponent(
          category
        )}&page=${page}&limit=8&sortOrder=asc`;
      } else
        api = `${Performer.getPerformerByFilter}?page=${page}&limit=8&sortOrder=asc`;
      break;

    default:
      if (category) {
        api = ` ${
          Performer.getPerformerByFilter
        }?categories=${encodeURIComponent(category)}&page=${page}&limit=8`;
      } else api = ` ${Performer.getPerformerByFilter}?page=${page}&limit=8`;
      break;
  }

  return async (dispatch) => {
    setLoader(true); // Start loading

    try {
      const response = await axios.get(`${api}`);
      console.log("response", response);
      dispatch({
        type: "GET_PERFORMER",
        performerData: response.data.performers, // Ensure the API actually returns this structure
        pageNo: page,
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: "GET_PERFORMER",
        performerData: [],
      });
    } finally {
      setLoader(false); // Stop loading
    }
  };
};
